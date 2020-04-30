import { ConflictException, Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { from, Observable, throwError } from 'rxjs'
import { catchError, concatMap, map, tap } from 'rxjs/operators'
import { CreateUser } from './interface/createUser.interface'
import { User } from './users.model'
import { LoggerService } from '../logger/logger.service'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    private readonly logger: LoggerService
  ) {}

  findById(id: string) {
    return from(this.userModel.findById(id).lean())
  }

  create(user: CreateUser): Observable<User> {
    this.logger.log('Creating user', user)
    return from(this.userModel.create(user)).pipe(
      catchError(error => {
        return throwError(new ConflictException(error))
      })
    )
  }
}
