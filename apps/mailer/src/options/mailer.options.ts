import {
  MailerOptions as IMailerOptions,
  MailerOptionsFactory,
} from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Injectable()
export class MailerOptions implements MailerOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMailerOptions(): IMailerOptions {
    const smtpOptions = this.configService.get('smtp');

    return {
      transport: {
        host: smtpOptions.host,
        port: +smtpOptions.port,
        secure: false,
        auth: {
          user: smtpOptions.user,
          pass: smtpOptions.pass,
        },
      },
      template: {
        dir: join(process.cwd(), 'apps/mailer/src/templates/'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    };
  }
}
