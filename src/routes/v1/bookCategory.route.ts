import express from "express"; 
import { celebrate } from 'celebrate';
import book_categoryController from "../../controllers/book_category.controller";
import book_categorySchema from "../../validations/book_category.validation";
import Authenticate from "../../middleware/Auth.middleware";
const router: express.Router = express.Router();

const {
    createBookCategorySchema,
    updateBookCategorySchema,
    deleteBookCategorySchema,   
} = book_categorySchema

//Create Book category
router.post('/create_bookCategory',Authenticate.Validate_User([Authenticate.ROLE.Admin,Authenticate.ROLE.Librarian]),
celebrate(createBookCategorySchema),book_categoryController.createBookCategory);

//Update Book category
router.put('/update_bookCategory/:id',Authenticate.Validate_User([Authenticate.ROLE.Admin,Authenticate.ROLE.Librarian]),
celebrate(updateBookCategorySchema),book_categoryController.updateBookCategory);

//Delete Book category
router.put('/delete_bookCategory/:id',Authenticate.Validate_User([Authenticate.ROLE.Admin,Authenticate.ROLE.Librarian]),
celebrate(deleteBookCategorySchema),book_categoryController.deleteBookCategory);

//Get All Book category
router.get('/get_allBookCategory',Authenticate.Validate_User([Authenticate.ROLE.Admin,Authenticate.ROLE.Librarian]),
book_categoryController.getAllBookCategory);


export = router