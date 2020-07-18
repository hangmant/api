import { ConflictException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { from, throwError } from 'rxjs'
import { concatMap } from 'rxjs/operators'
import { LoggerService } from '../logger/logger.service'
import { UsersService } from '../users/users.service'
import { EmailVerificationToken } from './models/email-verification-token.model'

@Injectable()
export class EmailVerificationService {
  constructor(
    @InjectModel(EmailVerificationToken)
    private readonly emailVerificationTokenModel: ReturnModelType<typeof EmailVerificationToken>,
    private readonly usersService: UsersService
  ) {}

  verifyByToken(token: string) {
    return from(this.emailVerificationTokenModel.findOne({ token }).lean()).pipe(
      concatMap(emailVerification => {
        if (!emailVerification) return throwError(new NotFoundException('Token not found'))
        return this.usersService.isEmailVerified(emailVerification.userId).pipe(
          concatMap(isVerified => {
            if (isVerified) {
              return throwError(new ConflictException('Your emails is arealdy verified'))
            }
            return this.usersService.verifyEmail(emailVerification.userId)
          })
        )
      })
    )
  }
}
