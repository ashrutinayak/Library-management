import {Joi} from 'celebrate';
const adminCreateLibrarianSchema = {
    body:{
        FirstName: Joi.string().required().example('Harsh'),
        LastName: Joi.string().required().example('Tank'),
        Email: Joi.string().required().email().example('harsh@gmail.com'),
        Password: Joi.string().required()
            .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
        ProfileImage : Joi.string(),
        UserID : Joi.number().integer(),
    }
}

const adminUpdateLibrarianSchema = {
    params:{
        ID: Joi.number().required()
    },
    body:{
        FirstName: Joi.string(),
        LastName: Joi.string(),
        ProfileImage : Joi.string(),
        UserID : Joi.number().integer(),
        Status: Joi.number().integer()
    }
}
const adminDeleteLibrarianSchema = {
    params:{
        ID: Joi.number().required()
    },
    body:{
        UserID : Joi.number().integer(),
    }
}

const updateAdminSchema = {
    body:{
        FirstName: Joi.string(),
        LastName: Joi.string(),
        ProfileImage : Joi.string(),
        UserID : Joi.number().integer(),
    }
}

export default {
    adminCreateLibrarianSchema,
    adminUpdateLibrarianSchema,
    adminDeleteLibrarianSchema,
    updateAdminSchema
}