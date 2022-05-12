import express from "express"; 
import { celebrate } from 'celebrate';
import adminController from "../../controllers/admin.controller";
import adminSchema from "../../validations/admin.validation";
import Authenticate from "../../middleware/Auth.middleware";

const {
    adminCreateLibrarianSchema,
    adminDeleteLibrarianSchema,
    adminUpdateLibrarianSchema,
    updateAdminSchema
} = adminSchema

const router: express.Router = express.Router();

//Admin Creates Librarian
router.post('/create_librarian',Authenticate.Validate_Admin,
celebrate(adminCreateLibrarianSchema),adminController.adminCreateLibrarian);
//Admin Updates Librarian
router.put('/update_librarian/:ID',Authenticate.Validate_Admin,
celebrate(adminUpdateLibrarianSchema),adminController.adminUpdateLibrarian);
//Admin Deletes Librarian
router.put('/delete_librarian/:ID',Authenticate.Validate_Admin,
celebrate(adminDeleteLibrarianSchema),adminController.adminDeleteLibrarian);
//Get all Librarian By Admin
router.get('/getAll_librarian',Authenticate.Validate_Admin,
adminController.adminGetAllLibrarian);
//Update Admin
router.put('/update_admin',Authenticate.Validate_Admin,celebrate(updateAdminSchema),adminController.updateAdmin);

export=router;