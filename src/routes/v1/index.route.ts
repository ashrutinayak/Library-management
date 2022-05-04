import express from "express"; 
import { Request, Response, RequestHandler } from "express";
import customer from "./customer.route";

const router: express.Router = express.Router();

//login & Sinup APIs
router.use('/customer',customer);

export default router;
 