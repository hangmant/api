import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { from, throwError } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { UsersService } from '../users/users.service';
import {
  EmailVerificationToken,
  EmailVerificationTokenDocument,
} from './models/email-verification-token.model';
import { LoggerService } from '../logger/logger.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EmailVerificationService {
  constructor(
    @InjectModel(EmailVerificationToken.name)
    private readonly emailVerificationTokenModel: Model<EmailVerificationTokenDocument>,
    private readonly usersService: UsersService,
    private readonly loggerService: LoggerService,
  ) {}

  verifyByToken(token: string) {
    return from(
      this.emailVerificationTokenModel.findOne({ token }).lean(),
    ).pipe(
      concatMap((emailVerification) => {
        if (!emailVerification)
          return throwError(new NotFoundException('Token not found'));

        return this.usersService.isEmailVerified(emailVerification.userId).pipe(
          concatMap((isVerified) => {
            if (isVerified) {
              this.loggerService.info('Your emails is arealdy verified');
              return throwError(
                new ConflictException('Your emails is arealdy verified'),
              );
            }
            return this.usersService.verifyEmail(emailVerification.userId);
          }),
          map(() => {
            this.loggerService.info('Email Verified successfully');
            return {
              message: 'Email Verified successfully',
            };
          }),
        );
      }),
    );
  }
}
