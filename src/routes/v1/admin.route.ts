import express, { NextFunction } from "express"; 
import { celebrate,errors, isCelebrateError } from 'celebrate';
import adminController from "../../controllers/admin.controller";
import adminSchema from "../../validations/admin.validation";
import Authenticate from "../../middleware/Auth.middleware"; 
import { Request, Response, RequestHandler } from "express";

const {
    adminCreateLibrarianSchema,
    adminDeleteLibrarianSchema,
    adminUpdateLibrarianSchema,
    updateAdminSchema
} = adminSchema


const router: express.Router = express.Router();

//Admin Creates Librarian
router.post('/create_librarian',Authenticate.Validate_User([Authenticate.ROLE.Admin]),
celebrate(adminCreateLibrarianSchema),adminController.adminCreateLibrarian);
//Admin Updates Librarian
router.put('/update_librarian/:ID',Authenticate.Validate_User([Authenticate.ROLE.Admin]),
celebrate(adminUpdateLibrarianSchema),adminController.adminUpdateLibrarian);
//Admin Deletes Librarian
router.put('/delete_librarian/:ID',Authenticate.Validate_User([Authenticate.ROLE.Admin]),
celebrate(adminDeleteLibrarianSchema),adminController.adminDeleteLibrarian);
//Get all Librarian By Admin
router.get('/getAll_librarian',Authenticate.Validate_User([Authenticate.ROLE.Admin]),
adminController.adminGetAllLibrarian);
//Update Admin
router.put('/update_admin',Authenticate.Validate_User([Authenticate.ROLE.Admin]),
celebrate(updateAdminSchema),adminController.updateAdmin);


export=router;