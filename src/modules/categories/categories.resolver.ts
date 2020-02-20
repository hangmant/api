import { Query, Resolver, Mutation, Args } from '@nestjs/graphql'
import { CategoriesService } from './categories.service'
import { CreateCategory } from './interfaces/createCategory.interface'
import { UpdateCategory } from './interfaces/updateCategory.interface'

@Resolver('Category')
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query()
  categories() {
    return this.categoriesService.findAll()
  }

  @Mutation()
  createCategory(@Args('data') category: CreateCategory) {
    return this.categoriesService.create(category)
  }

  @Mutation()
  updateCategory(@Args('_id') _id: string, @Args('data') data: UpdateCategory) {
    return this.categoriesService.updateById(_id, data)
  }
}
