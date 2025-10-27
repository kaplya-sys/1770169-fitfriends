import {resolve} from 'node:path';

import {ConfigService} from '@nestjs/config';
import {MailerAsyncOptions} from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import {HandlebarsAdapter} from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export function getMailerAsyncOptions(optionSpace: string): MailerAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => ({
      transport: {
        host: config.get<string>(`${optionSpace}.host`),
        port: config.get<number>(`${optionSpace}.port`),
        secure: config.get<boolean>(`${optionSpace}.secure`),
        auth: {
          user: config.get<string>(`${optionSpace}.user`),
          pass: config.get<string>(`${optionSpace}.password`)
        }
      },
      defaults: {
        from: config.get<string>(`${optionSpace}.from`),
      },
      template: {
        dir: resolve(__dirname, 'assets'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      }
    }),
    inject: [ConfigService]
  }
};
