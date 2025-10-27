import {Module} from '@nestjs/common';
import {MailerModule} from '@nestjs-modules/mailer';

import {getMailerAsyncOptions} from '@1770169-fitfriends/helpers';

import {MailService} from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync(getMailerAsyncOptions('mailConfig'))
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
