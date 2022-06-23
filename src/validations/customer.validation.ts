import { Joi } from "celebrate";

const stringPassswordError = new Error(
  "Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum 8 & MAximum 12 characters in length "
);
const createCustomerSchema = {
  body: {
    FirstName: Joi.string()
      .required()
      .example("Harsh")
      .description("FirstName of Customer"),
    LastName: Joi.string()
      .required()
      .example("Tank")
      .description("LastName of Customer"),
    Email: Joi.string()
      .required()
      .email()
      .example("harsh@gmail.com")
      .description("email of Customer"),
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
      })
      .description("password of Customer"),
    // Minimum eight and maximum 12 characters, at least one uppercase letter, one lowercase letter, one number and one special character
    Confirm_Password: Joi.string()
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
      })
      .description("confirmPassword"),
  },
};

const activateCustomerSchema = {
  params: {
    token: Joi.string().required(),
  },
};

const updateCustomerSchema = {
  body: {
    FirstName: Joi.string()
      .example("Harsh")
      .description("FirstName of Customer"),
    LastName: Joi.string().example("Tank").description("LastName of Customer"),
    ProfileImage: Joi.string(),
    UserID: Joi.number().integer(),
    updater_ID: Joi.number().integer(),
  },
};

const forgotPasswordSchema = {
  body: {
    Email: Joi.string().required().email().example("harsh@gmail.com"),
  },
};

const resetPasswordSchema = {
  body: {
    newPassword: Joi.string()
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
    confirmPassword: Joi.string()
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
  },
};

const customerIssueBookHistorySchema = {
  body: {
    status: Joi.number().integer(),
    UserID: Joi.number().integer(),
  },
};

export default {
  createCustomerSchema,
  activateCustomerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateCustomerSchema,
  customerIssueBookHistorySchema,
};
