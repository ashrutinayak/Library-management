import express from "express"; 
import { Request, Response, RequestHandler } from "express";
import { celebrate } from 'celebrate';
import librarianSchema from "../../validations/librarian.validation";
import librarianController from "../../controllers/librarian.controller";
import login_Authenticate from "../../middleware/Auth.middleware";
const router: express.Router = express.Router();

const { createLibrarianSchema, updateLibrarianSchema ,deleteLibrarianSchema } = librarianSchema

//Create Librarian
router.post('/create_librarian',login_Authenticate,celebrate(createLibrarianSchema),librarianController.createLibrarian);
//Update Librarian
router.put('/update_librarian/:ID',login_Authenticate,celebrate(updateLibrarianSchema),librarianController.updateLibrarian);
//Delete Librarian
router.put('/delete_librarian/:ID',login_Authenticate,celebrate(deleteLibrarianSchema),librarianController.deleteLibrarian);

export=router;