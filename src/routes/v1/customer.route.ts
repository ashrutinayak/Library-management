import express from "express"; 
import { Request, Response, RequestHandler } from "express";
import { celebrate } from 'celebrate';
import customerSchema from "../../validations/customer.validation";
import customerController from "../../controllers/customer.controller";
const router: express.Router = express.Router();

const {
    createCustomerSchema,
    loginCustomerSchema,
    forgotPasswordSchema,
    resetPasswordSchema
} = customerSchema

//Create Customer Route
router.post('/create_customer',celebrate(createCustomerSchema),customerController.createCustomer);
//Activate Account Route
router.get('/activate/:token',customerController.activateAccount);
//Login Route
router.post('/login',celebrate(loginCustomerSchema),customerController.Login);
//forgot Password Route
router.post('/forgot_Password',celebrate(forgotPasswordSchema),customerController.forgotPassword);
//Confirm Reset
//router.get('/confirm_reset/:token',customerController.confirmReset);
//Reset Password
router.post('/reset_Password',celebrate(resetPasswordSchema),customerController.resetPassword);

export=router;