import express from "express"; 
import { Request, Response, RequestHandler } from "express";
import customer from "./customer.route";
import librarin from "./librarian.route"
const router: express.Router = express.Router();

//login & Sinup APIs
router.use('/customer',customer);
router.use('/librarian',librarin);

export default router;
 