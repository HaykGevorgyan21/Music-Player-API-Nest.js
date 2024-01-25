import * as Joi from 'joi';
import { ConfigModuleOptions } from '@nestjs/config';
import { MONGODB_URI, NODE_ENV, PORT } from '../../constant/env-key.const';

export const configModuleOptions: ConfigModuleOptions = {
  validationSchema: Joi.object({
    [NODE_ENV]: Joi.string()
      .valid('development', 'production', 'test')
      .default('development'),
    [PORT]: Joi.number(),
    [MONGODB_URI]: Joi.string().default(
      'mongodb+srv://Hayk:8HSNcPNl9oxbG05u@cluster0.jhvhzsu.mongodb.net/?retryWrites=true&w=majority',
    ),
  }),
  validationOptions: {
    abortEarly: false,
  },
};
