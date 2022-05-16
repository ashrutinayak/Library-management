import express from "express"; 
import { Request, Response, RequestHandler } from "express";
import customer from "./customer.route";
import librarin from "./librarian.route";
import admin from "./admin.route";
import login from "./login.route";
import bookAuthor from "./bookAuthor.route";
import bookCategory from "./bookCategory.route"
import book from "./book.route";
const router: express.Router = express.Router();

//login & Sinup APIs
router.use('/customer',customer);
router.use('/librarian',librarin);
router.use('/admin',admin);
router.use('/login',login);
router.use('/bookAuthor',bookAuthor);
router.use('/bookCategory',bookCategory);
router.use('/book',book);

export default router;
 