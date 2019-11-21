import Joi from "joi";
import responseMessages from "../../constants/responseMessages";

export const createUser = Joi.object({
  firstname: Joi.string()
    .required()
    .trim()
    .error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "any.required":
            err.message = responseMessages.FIRST_NAME_REQUIRED;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  lastname: Joi.string()
    .required()
    .trim()
    .error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "any.required":
            err.message = responseMessages.LAST_NAME_REQUIRED;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  password: Joi.string()
    .trim()
    .required()
    .min(8)
    .max(12)
    .error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "any.required":
            err.message = responseMessages.PASSWORD_REQUIRED;
            break;
          case "string.min" || "string.max":
            err.message = responseMessages.PASSWORD_INVALID;
            break;
          case "string.empty":
            err.message = responseMessages.PASSWORD_EMPTY;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  email: Joi.string()
    .email()
    .required()
    .trim()
    .error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "any.required":
            err.message = responseMessages.EMAIL_REQUIRED;
            break;
          case "string.email":
            err.message = responseMessages.EMAIL_INVALID;
          default:
            break;
        }
      });
      return errors;
    }),
  phoneNumber: Joi.number()
    .required()
    .error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "any.required":
            err.message = responseMessages.PHONE_REQUIRED;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  admin: Joi.boolean()
    .required()
    .error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "any.required":
            err.message = "Specify if user is an admin";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  confirmed: Joi.boolean()
});

export const loginUser = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .trim()
    .error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "any.required":
            err.message = responseMessages.EMAIL_REQUIRED;
            break;
          case "string.email":
            err.message = responseMessages.EMAIL_INVALID;
          default:
            break;
        }
      });
      return errors;
    }),
  password: Joi.string()
    .trim()
    .required()
    .min(8)
    .max(12)
    .error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "any.required":
            err.message = responseMessages.PASSWORD_REQUIRED;
            break;
          case "string.min" || "string.max":
            err.message = responseMessages.PASSWORD_INVALID;
            break;
          case "string.empty":
            err.message = responseMessages.PASSWORD_EMPTY;
            break;
          default:
            break;
        }
      });
      return errors;
    })
});

export const updateUser = Joi.object({
  firstname: Joi.string()
    .required()
    .trim()
    .error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "any.required":
            err.message = responseMessages.FIRST_NAME_REQUIRED;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  lastname: Joi.string()
    .required()
    .trim()
    .error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "any.required":
            err.message = responseMessages.LAST_NAME_REQUIRED;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  phoneNumber: Joi.number()
    .required()
    .error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "any.required":
            err.message = responseMessages.PHONE_REQUIRED;
            break;
          default:
            break;
        }
      });
      return errors;
    })
});

export const emailVal = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .trim()
    .error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "any.required":
            err.message = responseMessages.EMAIL_REQUIRED;
            break;
          case "string.email":
            err.message = responseMessages.EMAIL_INVALID;
          default:
            break;
        }
      });
      return errors;
    })
});

export const passwordsVal = Joi.object({
  password: Joi.string()
    .trim()
    .required()
    .min(8)
    .max(12)
    .error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "any.required":
            err.message = responseMessages.PASSWORD_REQUIRED;
            break;
          case "string.min" || "string.max":
            err.message = responseMessages.PASSWORD_INVALID;
            break;
          case "string.empty":
            err.message = responseMessages.PASSWORD_EMPTY;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .options({ language: { any: { allowOnly: "Passwords do not match" } } })
    .error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "any.required":
            err.message = responseMessages.PASSWORD_REQUIRED;
            break;
          case "string.empty":
            err.message = responseMessages.PASSWORD_EMPTY;
            break;
          default:
            break;
        }
      });
      return errors;
    })
});
