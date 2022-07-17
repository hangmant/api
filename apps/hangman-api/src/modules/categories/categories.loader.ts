import { Injectable } from '@nestjs/common'
import * as DataLoader from 'dataloader'
import { NestDataLoader } from '@dantehemerson/nestjs-dataloader'
import { dlSort } from '../../utils/dlSort'
import { CategoriesService } from './categories.service'
import { Category } from './models/categories.model'

@Injectable()
export class CategoriesLoader implements NestDataLoader<string, Category> {
  constructor(private readonly categoriesService: CategoriesService) {}

  generateDataLoader(): DataLoader<string, Category> {
    return new DataLoader<string, Category>(async keys => {
      const items = await this.categoriesService.findByIds(keys)
      return dlSort(keys, items)
    })
  }
}
