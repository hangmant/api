import { ConflictException, Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { from, Observable, throwError, of, concat } from 'rxjs'
import { catchError, concatMap, tap } from 'rxjs/operators'
import { BcryptService } from '../bcrypt/bcrypt.service'
import { LoggerService } from '../logger/logger.service'
import { CreateUser } from './interface/createUser.interface'
import { UpdateUser } from './interface/updateUser.interface'
import { User } from './users.model'
import { MailerService } from '@nestjs-modules/mailer'
import { config } from '../../config'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    private readonly mailerService: MailerService,
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
          tap(createdUser => this.sendConfirmationEmail(createdUser)),
          catchError(error => {
            this.logger.error('Error on create user', error)
            return throwError(new ConflictException(error))
          })
        )
      )
    )
  }

  private sendConfirmationEmail(user: User) {
    return from(
      this.mailerService.sendMail({
        to: user.email,
        from: 'noreply@hangwoman.com',
        subject: 'HangWoman.com - Registration Confirmation',
        template: 'email-confirmation',
        context: {
          confirmEmailLink: config.hangwomanApi
        }
      })
    ).subscribe(
      result => {
        this.logger.info('Confirmation email sended', result)
      },
      error => {
        this.logger.error('Error on send confirmation email', error)
      }
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
