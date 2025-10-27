import * as Joi from 'joi';

export const mailValidationSchema = Joi.object({
  host: Joi.string().valid().hostname().required(),
  port: Joi.number().port(),
  user: Joi.string().required(),
  password: Joi.string().required(),
  from: Joi.string().required(),
  secure: Joi.boolean().required()
})
