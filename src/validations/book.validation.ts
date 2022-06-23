import { Joi } from "celebrate";
const createBookSchema = {
  body: {
    name: Joi.string().required(),
    description: Joi.string(),
    inStock: Joi.number().integer().required(),
    bookAuthorID: Joi.number().integer().required(),
    bookCategoryID: Joi.number().integer().required(),
    UserID: Joi.number().integer().required(),
  },
};

const updateBookSchema = {
  params: {
    id: Joi.number().integer(),
  },
  body: {
    name: Joi.string(),
    description: Joi.string(),
    inStock: Joi.number().integer(),
    bookAuthorID: Joi.number().integer(),
    bookCategoryID: Joi.number().integer(),
    UserID: Joi.number().integer().required(),
  },
};

const delBookSchema = {
  params: {
    id: Joi.number().integer(),
  },
  body: {
    UserID: Joi.number().integer().required(),
  },
};

export default {
  createBookSchema,
  updateBookSchema,
  delBookSchema,
};
