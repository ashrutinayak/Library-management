import express from "express"; 
import { celebrate } from 'celebrate';
import Authenticate from "../../middleware/Auth.middleware";
import bookController from "../../controllers/book.controller";
import bookSchema from "../../validations/book.validation";

const router: express.Router = express.Router();

const {
    createBookSchema,
    updateBookSchema,
    delBookSchema
} = bookSchema

//create Book route
router.post('/create_book',Authenticate.Validate_Admin_or_Librarian,
celebrate(createBookSchema),bookController.createBook);
//update Book route
router.put('/update_book/:id',Authenticate.Validate_Admin_or_Librarian,
celebrate(updateBookSchema),bookController.updateBook);
//delete Book route
router.put('/delete_book/:id',Authenticate.Validate_Admin_or_Librarian,
celebrate(delBookSchema),bookController.deleteBook);
//get All book route
router.get('/get_Allbook',Authenticate.Validate_Admin_or_Librarian,
bookController.getAllBooks);

export =router;