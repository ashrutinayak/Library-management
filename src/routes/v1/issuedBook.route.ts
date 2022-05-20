import express from "express"; 
import { celebrate } from 'celebrate';
import Authenticate from "../../middleware/Auth.middleware";
import issuedBookController from "../../controllers/issuedBook.controller";
import issuedBookSchema from "../../validations/issuedBook.validation";

const router: express.Router = express.Router();

const {
    issueBookSchema,
    submitBookSchema,
    lostBookSchema,
    } = issuedBookSchema

router.post('/issue_book',Authenticate.Validate_Librarian,
celebrate(issueBookSchema),issuedBookController.issueBook);

router.post('/submit_book',Authenticate.Validate_Librarian,
celebrate(submitBookSchema),issuedBookController.submitBook);

router.post('/lost_book',Authenticate.Validate_Librarian,
celebrate(lostBookSchema),issuedBookController.lostBook);

router.post('/issue_filter',Authenticate.Validate_Admin_or_Librarian,
issuedBookController.bookFilterFeatures);

export = router;