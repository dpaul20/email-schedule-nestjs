import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  EMAIL_SERVICE: Joi.string().required(),
  EMAIL_USER: Joi.string().required(),
  EMAIL_PASSWORD: Joi.string().required(),
});
