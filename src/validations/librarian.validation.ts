import {Joi} from 'celebrate';

const updateLibrarianSchema = {
    body:{
        FirstName: Joi.string(),
        LastName: Joi.string(),
        ProfileImage : Joi.string(),
        UserID : Joi.number().integer(),
        updater_ID: Joi.number().integer(),
    }
}

export default {
    updateLibrarianSchema,
}