import express from "express"; 
import { Request, Response, RequestHandler } from "express";
import { celebrate } from 'celebrate';
import librarianSchema from "../../validations/librarian.validation";
import librarianController from "../../controllers/librarian.controller";
import Authenticate from "../../middleware/Auth.middleware";
const router: express.Router = express.Router();

const { 
    updateLibrarianSchema 
    } = librarianSchema

//Update Librarian by Admin
router.put('/update_librarian',Authenticate.Validate_Librarian,celebrate(updateLibrarianSchema),librarianController.updateLibrarian);
export=router;