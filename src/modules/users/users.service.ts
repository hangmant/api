import { ConflictException, Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { from, Observable, throwError, of, concat } from 'rxjs'
import { catchError, concatMap } from 'rxjs/operators'
import { BcryptService } from '../bcrypt/bcrypt.service'
import { LoggerService } from '../logger/logger.service'
import { CreateUser } from './interface/createUser.interface'
import { UpdateUser } from './interface/updateUser.interface'
import { User } from './users.model'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    private readonly logger: LoggerService,
    // TODO: move encryptation function to another module
    private readonly bcryptService: BcryptService
  ) {}

  findById(id: string, proyection?: any): Observable<User> {
    return from(this.userModel.findById(id, proyection).lean())
  }

  findByEmail(email: string): Observable<User> {
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
          catchError(error => {
            return throwError(new ConflictException(error))
          })
        )
      )
    )
  }

  private throwIfEmailExists(email: string): Observable<User> {
    return from(this.userModel.findOne({ email }).lean()).pipe(
      concatMap(user => {
        if (user) {
          return throwError(new ConflictException(`Email user already exists`))
        }
        return of(user)
      })
    )
  }
}
