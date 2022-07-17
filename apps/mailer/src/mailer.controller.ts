import { Controller, Get } from '@nestjs/common';
import { MailerService } from './mailer.service';

@Controller('jajajjajajaj')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Get()
  getHello(): string {
    return this.mailerService.getHello();
  }
}
