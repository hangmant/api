import { Query, Resolver } from '@nestjs/graphql'
import { CategoriesService } from './categories.service'

@Resolver('Category')
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query()
  words() {
    return this.categoriesService.findAll()
  }
}
