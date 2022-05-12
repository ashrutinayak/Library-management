import express from "express"; 
import { Request, Response, RequestHandler } from "express";
import { celebrate } from 'celebrate';
import customerSchema from "../../validations/customer.validation";
import customerController from "../../controllers/customer.controller";
import Authenticate  from "../../middleware/Auth.middleware"
const router: express.Router = express.Router();

const {
    createCustomerSchema,
    activateCustomerSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    updateCustomerSchema
} = customerSchema

//Create Customer Route
router.post('/create_customer',celebrate(createCustomerSchema),customerController.createCustomer);
//Activate Account Route
router.get('/activate/:token',celebrate(activateCustomerSchema),customerController.activateAccount);
//Get All User
router.get('/getAllUsers',customerController.getAllUsers);
//Forget Password
router.post('/forgot_Password',celebrate(forgotPasswordSchema),customerController.forgotPassword);
//Reset Password
router.post('/reset_Password',celebrate(resetPasswordSchema),customerController.resetPassword);
//update Customer
router.put('/update_customer',Authenticate.Validate_Customer,celebrate(updateCustomerSchema),customerController.updateCustomer)

export=router;