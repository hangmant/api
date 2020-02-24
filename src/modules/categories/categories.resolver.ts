import { Query, Resolver, Mutation, Args } from '@nestjs/graphql'
import { CategoriesService } from './categories.service'
import { UpdateCategoryDto } from './dto/updateCategory.dto'
import { CreateCategoryDto } from './dto/createCategory.dto'

@Resolver('Category')
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query()
  categories() {
    return this.categoriesService.findAll()
  }

  @Mutation()
  createCategory(@Args('data') category: CreateCategoryDto) {
    return this.categoriesService.create(category)
  }

  @Mutation()
  updateCategory(@Args('_id') _id: string, @Args('data') data: UpdateCategoryDto) {
    return this.categoriesService.updateById(_id, data)
  }

  @Mutation()
  deleteCategory(@Args('_id') _id: string) {
    return this.categoriesService.deleteById(_id)
  }
}
