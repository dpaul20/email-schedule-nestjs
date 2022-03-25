import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  APP_PORT: Joi.number().required().default(3000),
  EMAIL_HOST: Joi.string().required(),
  EMAIL_PORT: Joi.number().required().default(587),
  EMAIL_USER: Joi.string().required(),
  EMAIL_PASSWORD: Joi.string().required(),
  EMAIL_FROM: Joi.string().required(),
  EMAIL_SUBJECT: Joi.string().required(),
});
