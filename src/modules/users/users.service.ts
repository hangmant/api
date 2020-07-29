import { ConflictException, Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { from, Observable, of, throwError } from 'rxjs'
import { catchError, concatMap, map, tap } from 'rxjs/operators'
import { BcryptService } from '../bcrypt/bcrypt.service'
import { GravatarService } from '../common/services/gravatar.service'
import { EmailVerificationSenderService } from '../email-verification-sender/email-verification-sender.service'
import { LoggerService } from '../logger/logger.service'
import { UserCreateInput } from './dto/user-create.input'
import { UserUpdateInput } from './dto/user-update.input'
import { User } from './models/user.model'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    private readonly emailVerificationSenderService: EmailVerificationSenderService,
    private readonly logger: LoggerService,
    private readonly bcryptService: BcryptService,
    private readonly gravatarService: GravatarService
  ) {}

  findById(id: string, proyection?: any): Observable<User> {
    return from(this.userModel.findById(id, proyection).lean())
  }

  findByIds(ids: readonly string[]): Observable<User[]> {
    return from(this.userModel.find({ _id: { $in: ids } }).lean())
  }

  findByEmail(email: string): Observable<User> {
    return from(this.userModel.findOne({ email }).lean())
  }

  update(id: string, data: UserUpdateInput): Observable<User> {
    return from(
      this.userModel
        .findByIdAndUpdate(
          id,
          {
            $set: data as any
          },
          { new: true }
        )
        .lean()
    )
  }

  create(user: UserCreateInput): Observable<User> {
    user.avatar = user.avatar ?? this.gravatarService.forEmail(user.email)

    this.logger.log('Creating user', user)
    return this.throwIfEmailExists(user.email).pipe(
      concatMap(() =>
        this.bcryptService.encryptPassword(user.password).pipe(
          concatMap((encryptedPassword: string) => {
            return from(
              this.userModel.create({
                ...user,
                password: encryptedPassword
              })
            )
          }),
          tap(createdUser => this.emailVerificationSenderService.createAndSendToken(createdUser).subscribe()),
          catchError(error => {
            this.logger.error('Error on create user', error)
            return throwError(new ConflictException(error))
          })
        )
      )
    )
  }

  isEmailVerified(userId: string): Observable<boolean> {
    return from(this.userModel.findById(userId, { isEmailVerified: 1 }).lean()).pipe(
      map(user => {
        if (!user) {
          // TODO: Currently return not verified if user not exists.
          return false
        }
        return Boolean(user.isEmailVerified)
      })
    )
  }

  verifyEmail(userId: string): Observable<User> {
    return from(
      this.userModel
        .findByIdAndUpdate(
          userId,
          {
            $set: {
              isEmailVerified: true
            }
          },
          { new: true }
        )
        .lean()
    )
  }

  private throwIfEmailExists(email: string): Observable<User> {
    return from(this.userModel.findOne({ email }).lean()).pipe(
      concatMap(user => {
        if (user) {
          this.logger.error('Email user already exists')
          return throwError(new ConflictException(`Email user already exists`))
        }
        return of(user)
      })
    )
  }
}
