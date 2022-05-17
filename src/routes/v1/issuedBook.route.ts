import express from "express"; 
import { celebrate } from 'celebrate';
import Authenticate from "../../middleware/Auth.middleware";
import issuedBookController from "../../controllers/issuedBook.controller";
import issuedBookSchema from "../../validations/issuedBook.validation";

const router: express.Router = express.Router();

const {issueBookSchema} = issuedBookSchema

router.post('/issue_book',Authenticate.Validate_Librarian,
celebrate(issueBookSchema),issuedBookController.issueBook);

export = router;