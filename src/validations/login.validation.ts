import { Joi } from "celebrate";

const loginUserSchema = {
  body: {
    Email: Joi.string()
      .required()
      .email()
      .example("harsh@gmail.com")
      .description("email of Customer"),
    Password: Joi.string().required().description("password of Customer"),
  },
};

export default {
  loginUserSchema,
};
