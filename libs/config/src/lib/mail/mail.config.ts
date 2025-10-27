import {registerAs} from '@nestjs/config';

import {createMessage, parseBoolean} from '@1770169-fitfriends/helpers';
import {Mail} from '@1770169-fitfriends/types';

import {mailValidationSchema} from './mail-validation.schema';
import {VALIDATE_ERROR_MESSAGE} from './mail.constant';

function validationMailConfig(config: Mail): void {
  const {error} = mailValidationSchema.validate(config, {abortEarly: true});

  if (error) {
    throw new Error(createMessage(VALIDATE_ERROR_MESSAGE, [error]))
  }
}

function getMailConfig(): Mail {
  const config: Mail = {
    host: process.env.MAIL_SMTP_HOST || '',
    port: parseInt(process.env.MAIL_SMTP_PORT  || '', 10),
    user: process.env.MAIL_USER_NAME || '',
    password: process.env.MAIL_USER_PASSWORD || '',
    from: process.env.MAIL_FROM || '',
    secure: parseBoolean(process.env.MAIL_SECURE)
  }

  validationMailConfig(config);

  return config;
 }

export const MailConfig = registerAs('mailConfig', getMailConfig);
