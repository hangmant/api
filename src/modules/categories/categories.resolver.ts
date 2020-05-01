import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import * as DataLoader from 'dataloader'
import { Loader } from 'nestjs-dataloader-dan'
import { from } from 'rxjs'
import { GqlAuthGuard } from '../../guards/gqlAuth.guard'
import { CategoriesLoader } from './categories.loader'
import { Category } from './categories.model'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dto/createCategory.dto'
import { UpdateCategoryDto } from './dto/updateCategory.dto'

@Resolver('Category')
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(GqlAuthGuard)
  @Query()
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
