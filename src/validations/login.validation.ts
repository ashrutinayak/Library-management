import {Joi} from 'celebrate';

const loginUserSchema = {
    body:{
        Email: Joi.string().required().email().example('harsh@gmail.com')
                    .description('email of Customer'),
            Password: Joi.string().required()
                //.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                .description('password of Customer'),
    }
}

export default {
    loginUserSchema
}