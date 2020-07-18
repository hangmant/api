import { ConflictException, Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { from, Observable, of, throwError } from 'rxjs'
import { catchError, concatMap, map, tap } from 'rxjs/operators'
import { BcryptService } from '../bcrypt/bcrypt.service'
import { EmailVerificationSenderService } from '../email-verification-sender/email-verification-sender.service'
import { LoggerService } from '../logger/logger.service'
import { CreateUser } from './interface/createUser.interface'
import { UpdateUser } from './interface/updateUser.interface'
import { User } from './users.model'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    private readonly emailVerificationSenderService: EmailVerificationSenderService,
    private readonly logger: LoggerService,
    private readonly bcryptService: BcryptService
  ) {}

  findById(id: string, proyection?: any): Observable<User> {
    return from(this.userModel.findById(id, proyection).lean())
  }

  findByEmail(email: string): Observable<User & { _id: string }> {
    return from(this.userModel.findOne({ email }).lean())
  }

  update(id: string, data: UpdateUser): Observable<User> {
    return from(
      this.userModel
        .findByIdAndUpdate(
          id,
          {
            $set: data
          },
          { new: true }
        )
        .lean()
    )
  }

  create(user: CreateUser): Observable<User> {
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
          tap(createdUser => this.emailVerificationSenderService.createAndSendToken(createdUser)),
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
