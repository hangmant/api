import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectModel } from '@nestjs/mongoose'
import { randomBytes } from 'crypto'
import { Model } from 'mongoose'
import { from } from 'rxjs'
import { concatMap } from 'rxjs/operators'
import { TEMPLATES } from '../../templates'
import { EmailVerificationToken, EmailVerificationTokenDocument } from '../email-verification/models/email-verification-token.model'
import { User } from '../users/models/user.model'

@Injectable()
export class EmailVerificationSenderService {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(EmailVerificationToken.name)
    private readonly emailVerificationTokenModel: Model<EmailVerificationTokenDocument>,
    private readonly mailerService: MailerService
  ) {}

  createAndSendToken(user: User) {
    const token = randomBytes(20).toString('hex')

    return from(
      this.emailVerificationTokenModel.create([
        {
          userId: user._id,
          token
        }
      ])
    ).pipe(
      concatMap((createdResult: any) => {
        const { token: createdToken } = createdResult.shift()
        return this.sendVerificationEmail(user.email, createdToken)
      })
    )
  }

  private sendVerificationEmail(userEmail: string, token: string) {
    return from(
      this.mailerService.sendMail({
        to: userEmail,
        from: 'noreply@hangwoman.com',
        subject: 'HangWoman.com - Registration Confirmation',
        template: TEMPLATES.EMAIL_CONFIRMATION,
        context: {
          confirmEmailLink: `${this.configService.get('hangwomanFE')}/verify-email/${token}`
        }
      })
    )
  }
}
