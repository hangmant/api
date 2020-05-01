import * as DataLoader from 'dataloader'
import { Injectable } from '@nestjs/common'
import { NestDataLoader } from 'nestjs-dataloader-dan'
import { CategoriesService } from './categories.service'
import { Category } from './categories.model'
import { concatMap } from 'rxjs/operators'
import { dlSort } from '../../../src/utils/dlSort'
import { of } from 'rxjs'

@Injectable()
export class CategoriesLoader implements NestDataLoader<string, Category> {
  constructor(private readonly categoriesService: CategoriesService) {}

  generateDataLoader(): DataLoader<string, Category> {
    return new DataLoader<string, Category>(keys => {
      return this.categoriesService
        .findByIds(keys)
        .pipe(concatMap(items => of(dlSort(keys, items))))
        .toPromise()
    })
  }
}
