import * as Joi from 'joi';

import {Environment} from '@1770169-fitfriends/types';

export const filesValidationSchema = Joi.object({
  environment: Joi.string().valid(...Object.values(Environment)).required(),
  port: Joi.number().required(),
  host: Joi.string().required(),
  uploadDirectory: Joi.string().required(),
})
