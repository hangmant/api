import { ISendMailOptions } from '@nestjs-modules/mailer';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MailerService } from './mailer.service';

@Controller()
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @MessagePattern({ cmd: 'send-mail' })
  sendMail(sendMailOptions: ISendMailOptions): string {
    return this.mailerService.sendMail(sendMailOptions);
  }
}
