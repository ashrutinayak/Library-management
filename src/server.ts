import * as core from 'express-serve-static-core'
import express from 'express'
import cors from 'cors'
import routes from './routes/index.route'
import modelConfig from './config/model.config'
import multer from 'multer';
import bodyParser from 'body-parser';
import path from 'path';
require('dotenv').config();

const corsOptions = {
    origin: `http://localhost:${process.env.PORT}`
  };

export async function createServer(): Promise<core.Express> {
    const server: core.Express = express()
    server.use(cors(corsOptions));
    // Body parsing
    process.env.PWD = process.cwd();
    server.use(express.static(path.join(process.env.PWD,'public')));
    server.use(express.static('public/uploads'));
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: true }))
    const storage = multer.diskStorage({
      destination: function(req,file,cb)
      {
        cb(null,'public/uploads');
      },
      filename: function(req,file,cb)
      {
        cb(null,Date.now()+file.originalname);
      }
    });
    server.use(multer({storage:storage}).single('file'))
    // api routes
    server.use('/',routes);
    return server
  }

  export async function startServer(
    expressServer: core.Express
  ): Promise<core.Express> {
    // verify db connection
    await modelConfig.verifyDbConnection
    expressServer.listen(process.env.PORT)
    console.log(`
    =================================================================
  
     Server started on port ${process.env.PORT} 
  
    =================================================================
    `)
    return expressServer
  }