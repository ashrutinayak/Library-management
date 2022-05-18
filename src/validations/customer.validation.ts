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
                .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
                .description('password of Customer'),
            Confirm_Password: Joi.string().required()
                .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
                .description('confirmPassword'),
        }
}

const activateCustomerSchema = {
    params:{
        token:Joi.string().required()
    }
}

const updateCustomerSchema = {
    body:{
        FirstName: Joi.string().example('Harsh')
            .description('FirstName of Customer'),
        LastName: Joi.string().example('Tank')
            .description('LastName of Customer'),
        ProfileImage: Joi.string(),
        UserID : Joi.number().integer(),
        updater_ID : Joi.number().integer()
    }
}

const forgotPasswordSchema = {
    body:{
        Email: Joi.string().required().email().example('harsh@gmail.com')
    }
}

const resetPasswordSchema = {
    body:{
        token: Joi.string().required(),
        Email: Joi.string().required().email().example('harsh@gmail.com'),
        newPassword : Joi.string().required()
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    }
}

const customerIssueBookHistorySchema = {
    body:{
        status:Joi.number().integer(),
        UserID : Joi.number().integer()
    }
}
export default {
    createCustomerSchema,
    activateCustomerSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    updateCustomerSchema,
    customerIssueBookHistorySchema
}