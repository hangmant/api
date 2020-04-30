import { Query, Resolver, Mutation, Args } from '@nestjs/graphql'
import { CategoriesService } from './categories.service'
import { UpdateCategoryDto } from './dto/updateCategory.dto'
import { CreateCategoryDto } from './dto/createCategory.dto'
import { CategoriesLoader } from './categories.loader'
import * as DataLoader from 'dataloader'
import { Loader } from 'nestjs-dataloader-dan'
import { Category } from './categories.model'
import { from } from 'rxjs'
import { CategoryGraphQLModel } from './category.graphql-model'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../../guards/gqlAuth.guard'
@Resolver(of => CategoryGraphQLModel)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(GqlAuthGuard)
  @Query(returns => [CategoryGraphQLModel])
  categories() {
    return this.categoriesService.findAll()
  }

  @Query(() => [Category])
  category(@Args('_id') _id, @Loader(CategoriesLoader.name) categoriesLoader: DataLoader<string, Category>) {
    return from(categoriesLoader.load(_id))
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
