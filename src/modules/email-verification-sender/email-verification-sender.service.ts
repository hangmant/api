import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { randomBytes } from 'crypto'
import { InjectModel } from 'nestjs-typegoose'
import { from } from 'rxjs'
import { concatMap } from 'rxjs/operators'
import { config } from '../../config'
import { TEMPLATES } from '../../templates'
import { EmailVerificationToken } from '../email-verification/models/email-verification-token.model'
import { User } from '../users/users.model'
import { WithId } from '../../types/with-id.type'

@Injectable()
export class EmailVerificationSenderService {
  constructor(
    @InjectModel(EmailVerificationToken)
    private readonly emailVerificationTokenModel: ReturnModelType<typeof EmailVerificationToken>,
    private readonly mailerService: MailerService
  ) {}

  createAndSendToken(user: WithId<User>) {
    const token = randomBytes(20).toString('hex')

    return from(
      this.emailVerificationTokenModel.create([
        {
          userId: user._id,
          token
        }
      ])
    ).pipe(
      concatMap(createdResult => {
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
          confirmEmailLink: `${config.hangwomanFE}/verify-email/${token}`
        }
      })
    )
  }
}
