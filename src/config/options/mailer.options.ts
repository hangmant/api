import { MailerOptions as IMailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { Injectable } from '@nestjs/common'
import { join } from 'path'
import { config } from '../index'

@Injectable()
export class MailerOptions implements MailerOptionsFactory {
  createMailerOptions(): IMailerOptions {
    return {
      transport: {
        host: config.mailer.smpt.host,
        port: +config.mailer.smpt.port,
        secure: false,
        auth: {
          user: config.mailer.smpt.user,
          pass: config.mailer.smpt.pass
        }
      },
      template: {
        dir: join(process.cwd(), '/src/templates/'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      }
    }
  }
}
