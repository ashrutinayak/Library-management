import { Joi } from "celebrate";
const createBookAuthorSchema = {
  body: {
    name: Joi.string().required(),
    description: Joi.string(),
    UserID: Joi.number().integer(),
  },
};
const updateBookAuthorSchema = {
  params: {
    id: Joi.number().required(),
  },
  body: {
    name: Joi.string(),
    description: Joi.string(),
    UserID: Joi.number().integer(),
  },
};

const deleteBookAuthorSchema = {
  params: {
    id: Joi.number().required(),
  },
  body: {
    UserID: Joi.number().integer(),
  },
};
export default {
  createBookAuthorSchema,
  updateBookAuthorSchema,
  deleteBookAuthorSchema,
};
