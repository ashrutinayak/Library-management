import {Joi} from 'celebrate';

const issueBookSchema = {
    body:{
        book_code:Joi.string().required(),
        customer_code:Joi.string().required(),
        endDateTime:Joi.date(),
        UserID:Joi.number().integer()
    }
}
const submitBookSchema = {
    body:{
        book_code:Joi.string().required(),
        customer_code:Joi.string().required(),
        UserID:Joi.number().integer()
    }
}

const lostBookSchema = {
    body:{
        book_code:Joi.string().required(),
        customer_code:Joi.string().required(),
        UserID:Joi.number().integer()
    }
}
export default {
    issueBookSchema,
    submitBookSchema,
    lostBookSchema
}