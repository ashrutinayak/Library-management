import {Joi} from 'celebrate';

const issueBookSchema = {
    body:{
        code:Joi.string().required(),
        customerUserID:Joi.number().integer(),
        UserID:Joi.number().integer()
    }
}

export default {
    issueBookSchema
}