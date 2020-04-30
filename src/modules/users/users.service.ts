import { ConflictException, Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { from, Observable, throwError } from 'rxjs'
import { catchError, concatMap } from 'rxjs/operators'
import { BcryptService } from '../bcrypt/bcrypt.service'
import { LoggerService } from '../logger/logger.service'
import { CreateUser } from './interface/createUser.interface'
import { User } from './users.model'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    private readonly logger: LoggerService,
    // TODO: move encryptation function to another module
    private readonly bcryptService: BcryptService
  ) {}

  findById(id: string): Observable<User> {
    return from(this.userModel.findById(id).lean())
  }

  findByEmail(email: string): Observable<User> {
    return from(this.userModel.findOne({ email }).lean())
  }

  create(user: CreateUser): Observable<User> {
    this.logger.log('Creating user', user)
    return this.bcryptService.encryptPassword(user.password).pipe(
      concatMap((encryptedPassword: string) => {
        return from(
          this.userModel.create({
            ...user,
            password: encryptedPassword
          })
        )
      }),
      catchError(error => {
        return throwError(new ConflictException(error))
      })
    )
  }
}
