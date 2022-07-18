import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerService {
  sendMail(): string {
    return 'Hello World!';
  }
}
