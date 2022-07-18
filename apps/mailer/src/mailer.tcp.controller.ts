import { ISendMailOptions } from '@nestjs-modules/mailer';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MailerService } from './mailer.service';

@Controller()
export class MailerTcpController {
  constructor(private readonly mailerService: MailerService) {}

  @MessagePattern({ cmd: 'sendMail' })
  sendMail(options: ISendMailOptions) {
    console.log('JJAJAJAJAJJAJ');
    return this.mailerService.sendMail(options);
  }
}
