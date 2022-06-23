import { Joi } from "celebrate";
const adminCreateLibrarianSchema = {
  body: {
    FirstName: Joi.string().required().example("Harsh"),
    LastName: Joi.string().required().example("Tank"),
    Email: Joi.string().required().email().example("harsh@gmail.com"),
    Password: Joi.string()
      .required()
      .min(8)
      .max(12)
      .pattern(
        new RegExp(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/
        )
      )

      .label("Password")
      .messages({
        "string.empty": `Your {#label} can not be empty`,
        "string.min": `Your {#label} has to be at least {#limit} chars`,
        "string.max": `Your {#label} should have maximum {#limit} chars`,
        "any.required": `Your {#label} is required`,
        "string.pattern.base": `Your {#label} does not match the suggested pattern . It should contain at 1 Uppercase, 1 Lowercase, 1 Special Character, 1 Numeric Character and Should not contains Inbetween Spaces`,
      }),
    ProfileImage: Joi.string(),
    UserID: Joi.number().integer(),
  },
};

const adminUpdateLibrarianSchema = {
  params: {
    ID: Joi.number().required(),
  },
  body: {
    FirstName: Joi.string(),
    LastName: Joi.string(),
    ProfileImage: Joi.string(),
    UserID: Joi.number().integer(),
    Status: Joi.number().integer(),
  },
};
const adminDeleteLibrarianSchema = {
  params: {
    ID: Joi.number().required(),
  },
  body: {
    UserID: Joi.number().integer(),
  },
};

const updateAdminSchema = {
  body: {
    FirstName: Joi.string(),
    LastName: Joi.string(),
    ProfileImage: Joi.string(),
    UserID: Joi.number().integer(),
  },
};

export default {
  adminCreateLibrarianSchema,
  adminUpdateLibrarianSchema,
  adminDeleteLibrarianSchema,
  updateAdminSchema,
};
