import { MailerOptions as IMailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { join } from 'path'

@Injectable()
export class MailerOptions implements MailerOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMailerOptions(): IMailerOptions {
    const mailerOptions = this.configService.get('mailer')
    console.log('🤫 Dante ➤ MailerOptions ➤ createMailerOptions ➤ ', join(process.cwd(), 'apps/hangman-api/src/templates/'))
    return {
      transport: {
        host: mailerOptions.smpt.host,
        port: +mailerOptions.smpt.port,
        secure: false,
        auth: {
          user: mailerOptions.smpt.user,
          pass: mailerOptions.smpt.pass
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
