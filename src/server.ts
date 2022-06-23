import * as core from "express-serve-static-core";
import express from "express";
import cors from "cors";
import routes from "./routes/index.route";
import modelConfig from "./config/model.config";
import multer from "multer";
import bodyParser from "body-parser";
import path from "path";
import { isCelebrateError } from "celebrate";
import { NextFunction } from "express";
import { Request, Response } from "express";
import { apiResponseHandler } from "./middleware/apiResponse.middleware";

require("dotenv").config();

const corsOptions = {
  origin: `http://localhost:${process.env.PORT}`,
};

export async function createServer(): Promise<core.Express> {
  const server: core.Express = express();
  server.set("view engine", "ejs");
  server.set("views", "views");
  server.use(cors(corsOptions));
  // Body parsing
  process.env.PWD = process.cwd();
  server.use(express.static(path.join(process.env.PWD, "public")));
  server.use(express.static(path.join(__dirname, "public/css")));
  server.use(express.static("public/uploads/Profile_Image"));
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(express.static(path.join(__dirname, "public")));
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
  server.use(multer({ storage: storage }).single("file"));

  server.use("/", apiResponseHandler, routes);

  server.use(
    (error: Error, req: Request, res: Response, next: NextFunction) => {
      if (isCelebrateError(error)) {
        //if joi produces an error, it's likely a client-side problem
        const { details } = error.details.get(
          error.details.keys().next().value
        );
        const message = details
          .map((i: { message: string }) => i.message.replace(/['"]+/g, ""))
          .join(",");
        return res.status(400).json({
          error: message,
        });
      } //otherwise, it's probably a server-side problem.
      return res.status(500).send(error);
    }
  );
  return server;
}

export async function startServer(
  expressServer: core.Express
): Promise<core.Express> {
  // verify db connection
  await modelConfig.verifyDbConnection;
  expressServer.listen(process.env.PORT);
  console.log(`
    =================================================================
  
     Server started on port ${process.env.PORT} 
  
    =================================================================
    `);
  return expressServer;
}
