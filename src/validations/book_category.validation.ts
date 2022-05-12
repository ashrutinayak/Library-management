import {Joi} from 'celebrate';
const createBookCategorySchema = {
    body:{
        name: Joi.string().required(),
        description: Joi.string(),
        UserID: Joi.number().integer()
    }
}
const updateBookCategorySchema = {
    params:{
        id:Joi.number().required()
    },
    body:{
        name: Joi.string(),
        description: Joi.string(),
        UserID: Joi.number().integer()
    }
}

const deleteBookCategorySchema = {
    params:{
        id:Joi.number().required()
    },
    body:{
        UserID: Joi.number().integer()
    }
}
export default {
    createBookCategorySchema,
    updateBookCategorySchema,
    deleteBookCategorySchema
}