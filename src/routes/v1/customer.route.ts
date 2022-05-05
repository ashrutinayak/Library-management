import express from "express"; 
import { Request, Response, RequestHandler } from "express";
import { celebrate } from 'celebrate';
import customerSchema from "../../validations/customer.validation";
import customerController from "../../controllers/customer.controller";
const router: express.Router = express.Router();

const {
    createCustomerSchema,
    loginCustomerSchema
} = customerSchema

//Create Customer Route
router.post('/create_customer',celebrate(createCustomerSchema),customerController.createCustomer);
//Activate Account Route
router.post('/activate/:token',customerController.activateAccount);
//Login Route
router.post('/login',celebrate(loginCustomerSchema),customerController.Login);

export=router;