import { Injectable } from '@nestjs/common';
import {
  ISendMailOptions,
  MailerService as ExternalEmailService,
} from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
  constructor(private readonly mailService: ExternalEmailService) {}

  sendMail(options: ISendMailOptions) {
    console.log('🤫 Dante ➤ MailerService ➤ sendMail ➤ options', options);
    return this.mailService.sendMail(options);
  }
}
