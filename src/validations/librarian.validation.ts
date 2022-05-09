import {Joi} from 'celebrate';
const createLibrarianSchema = {
    body:{
        FirstName: Joi.string().required().example('Harsh'),
        LastName: Joi.string().required().example('Tank'),
        Email: Joi.string().required().email().example('harsh@gmail.com'),
        Password: Joi.string().required()
            .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
        ProfileImage : Joi.string(),
    }
}

const updateLibrarianSchema = {
    params:{
        ID: Joi.number().required()
    },
    body:{
        FirstName: Joi.string(),
        LastName: Joi.string(),
        ProfileImage : Joi.string(),
        Admin_ID: Joi.number().integer(),
        Status: Joi.number().integer()
    }
}
const deleteLibrarianSchema = {
    params:{
        ID: Joi.number().required()
    },
    body:{
        Admin_ID: Joi.number().integer()
    }
}

export default {
    createLibrarianSchema,
    updateLibrarianSchema,
    deleteLibrarianSchema
}