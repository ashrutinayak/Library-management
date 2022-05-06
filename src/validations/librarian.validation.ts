import {Joi} from 'celebrate';
const createLibrarianSchema = {
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
        ProfileImage : Joi.string()
            .description('Profile Image of  Customer'),
    }
}

export default {
    createLibrarianSchema
}