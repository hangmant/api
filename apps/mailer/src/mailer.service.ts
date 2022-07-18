import { Injectable } from '@nestjs/common';
import {
  ISendMailOptions,
  MailerService as ExternalEmailService,
} from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
  constructor(private readonly externalEmailService: ExternalEmailService) {}

  sendMail(options: ISendMailOptions): string {
    console.log('🤫 Dante ➤ MailerService ➤ sendMail ➤ options', options);
    return 'Hello World!';
  }
}
