import {Joi} from 'celebrate';

const createCustomerSchema = {
        body:{
            FirstName: Joi.string().required().example('Harsh')
                .description('FirstName of Customer'),
            LastName: Joi.string().required().example('Tank')
                .description('LastName of Customer'),
            Email: Joi.string().required().email().example('harsh@gmail.com')
                    .description('email of Customer'),
            Password: Joi.string().required()
                //.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                .description('password of Customer'),
            Confirm_Password: Joi.string().required()
                //.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                .description('confirmPassword'),
            ProfileImage : Joi.string()
                .description('Profile Image of  Customer'),
        }
}
export default {
    createCustomerSchema
}