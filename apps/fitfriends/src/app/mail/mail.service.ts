import {ConfigType} from '@nestjs/config';
import {Inject, Injectable} from '@nestjs/common';
import {MailerService} from '@nestjs-modules/mailer';

import {MailConfig} from '@1770169-fitfriends/config';
import {Training} from '@1770169-fitfriends/types';

import {EMAIL_SUBJECT, TEMPLATE_PATH} from './mail.constant';

@Injectable()
export class MailService {
  constructor(
    @Inject(MailConfig.KEY)
    private readonly mailConfig: ConfigType<typeof MailConfig>,
    private readonly mailerService: MailerService
  ) {}

  public async sendNotifyNewTraining(email: string, training: Training, trainingURL: string, unsubscribeURL: string) {
    await this.mailerService.sendMail({
      from: this.mailConfig.from,
      to: email,
      subject: EMAIL_SUBJECT,
      template: TEMPLATE_PATH,
      context: {
        training,
        trainingURL,
        unsubscribeURL
      }
    })
  }
}
