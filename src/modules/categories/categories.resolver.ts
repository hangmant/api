import { Query, Resolver, Mutation, Args } from '@nestjs/graphql'
import { CategoriesService } from './categories.service'
import { CreateCategory } from './interfaces/createCategory.interface'

@Resolver('Category')
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query()
  words() {
    return this.categoriesService.findAll()
  }

  @Mutation()
  createWord(@Args('data') category: CreateCategory) {
    return this.categoriesService.create(category)
  }
}
