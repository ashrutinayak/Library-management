import express from "express"; 
import { Request, Response, RequestHandler } from "express";
import { celebrate } from 'celebrate';
import book_authorController from "../../controllers/book_author.controller";
import book_authorSchema from "../../validations/book_author.validation";
import Authenticate from "../../middleware/Auth.middleware";
const router: express.Router = express.Router();

const {
    createBookAuthorSchema,
    updateBookAuthorSchema,
    deleteBookAuthorSchema
} = book_authorSchema

//Create Book Author
router.post('/create_bookAuthor',Authenticate.Validate_Admin_or_Librarian,
celebrate(createBookAuthorSchema),book_authorController.createBookAuthor);

//Update Book Author
router.put('/update_bookAuthor/:id',Authenticate.Validate_Admin_or_Librarian,
celebrate(updateBookAuthorSchema),book_authorController.updateBookAuthor);

//Delete Book Author
router.put('/delete_bookAuthor/:id',Authenticate.Validate_Admin_or_Librarian,
celebrate(deleteBookAuthorSchema),book_authorController.deleteBookAuthor);

//Get All Book Authors
router.get('/get_allBookAuthors',Authenticate.Validate_Admin_or_Librarian,
book_authorController.getAllBookAuthor);

export = router
