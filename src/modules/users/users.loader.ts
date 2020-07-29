import { Injectable } from '@nestjs/common'
import * as DataLoader from 'dataloader'
import { NestDataLoader } from 'nestjs-dataloader-dan'
import { of } from 'rxjs'
import { concatMap } from 'rxjs/operators'
import { dlSort } from '../../utils/dlSort'
import { User } from './models/user.model'
import { UsersService } from './users.service'

@Injectable()
export class UsersLoader implements NestDataLoader<string, User> {
  constructor(private readonly usersService: UsersService) {}

  generateDataLoader(): DataLoader<string, User> {
    return new DataLoader<string, User>(keys => {
      return this.usersService
        .findByIds(keys)
        .pipe(concatMap(items => of(dlSort(keys, items))))
        .toPromise()
    })
  }
}
