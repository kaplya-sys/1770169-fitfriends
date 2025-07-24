import {registerAs} from '@nestjs/config';

import {createMessage} from '@1770169-fitfriends/helpers';
import {AppConfig} from '@1770169-fitfriends/types';

import {VALIDATE_FILES_ERROR_MESSAGE} from '../config.constant';
import {filesValidationSchema} from './files-validation.schema';

function validationAppConfig(config: AppConfig): void {
  const {error} = filesValidationSchema.validate(config, {abortEarly: true});

  if (error) {
    throw new Error(createMessage(VALIDATE_FILES_ERROR_MESSAGE, [error.message]));
  }
}

function getAppConfig(): AppConfig {
  const config: AppConfig = {
    environment: process.env.NODE_ENV || '',
    port: parseInt(process.env.PORT || '', 10),
    host: process.env.HOST || '',
    uploadDirectory: process.env.UPLOAD_DIRECTORY || ''
  }
  validationAppConfig(config);

  return config;
}

export const FilesConfig = registerAs('filesConfig', getAppConfig);
