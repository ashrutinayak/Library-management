import express from "express";
import Authenticate from "../../middleware/Auth.middleware";
import bookController from "../../controllers/book.controller";
import bookSchema from "../../validations/book.validation";
import { celebrate } from "celebrate";

const router: express.Router = express.Router();

const { createBookSchema, updateBookSchema, delBookSchema } = bookSchema;

//create Book route
router.post(
  "/create_book",
  Authenticate.Validate_User([
    Authenticate.ROLE.Admin,
    Authenticate.ROLE.Librarian,
  ]),
  celebrate(createBookSchema),
  bookController.createBook
);
//update Book route
router.put(
  "/update_book/:id",
  Authenticate.Validate_User([
    Authenticate.ROLE.Admin,
    Authenticate.ROLE.Librarian,
  ]),
  celebrate(updateBookSchema),
  bookController.updateBook
);
//delete Book route
router.put(
  "/delete_book/:id",
  Authenticate.Validate_User([
    Authenticate.ROLE.Admin,
    Authenticate.ROLE.Librarian,
  ]),
  celebrate(delBookSchema),
  bookController.deleteBook
);
//get All book route
router.get(
  "/get_Allbook",
  Authenticate.Validate_User([
    Authenticate.ROLE.Admin,
    Authenticate.ROLE.Librarian,
  ]),
  bookController.getAllBooks
);

//get All book with related Data
router.get("/get_Allbook_with_data", bookController.getAllBooksWithData);

export = router;
