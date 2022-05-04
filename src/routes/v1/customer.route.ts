import express from "express"; 
import { Request, Response, RequestHandler } from "express";
import { celebrate } from 'celebrate';
import customerSchema from "../../validations/customer.validation";
import customerController from "../../controllers/customer.controller";
const router: express.Router = express.Router();

const {
    createCustomerSchema
} = customerSchema

router.post('/create_customer',celebrate(createCustomerSchema),customerController.createCustomer);

export=router;