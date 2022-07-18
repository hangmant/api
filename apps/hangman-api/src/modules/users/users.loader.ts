import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { NestDataLoader } from '@dantehemerson/nestjs-dataloader';
import { dlSort } from '../../utils/dlSort';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Injectable()
export class UsersLoader implements NestDataLoader<string, User> {
  constructor(private readonly usersService: UsersService) {}

  generateDataLoader(): DataLoader<string, User> {
    return new DataLoader<string, User>(async (keys) => {
      const items = await this.usersService.findByIds(keys);
      return dlSort(keys, items);
    });
  }
}
