import { UseGuards, NotFoundException } from '@nestjs/common'
import { Args, Mutation, Query, Resolver, ID } from '@nestjs/graphql'
import * as DataLoader from 'dataloader'
import { Loader } from 'nestjs-dataloader-dan'
import { from, of, throwError } from 'rxjs'
import { GqlAuthGuard } from '../../guards/gqlAuth.guard'
import { CategoriesLoader } from './categories.loader'
import { Category } from './models/categories.model'
import { CategoriesService } from './categories.service'
import { CategoryCreateInput } from './dto/category-create.input'
import { CategoryUpdateInput } from './dto/category-update.input'
import { throwIfEmpty, concatMap } from 'rxjs/operators'

@UseGuards(GqlAuthGuard)
@Resolver(of => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query(returns => [Category])
  categories() {
    return this.categoriesService.findAll()
  }

  @Query(returns => Category)
  category(
    @Args({ name: '_id', type: () => ID }) id: string,
    @Loader(CategoriesLoader.name) categoriesLoader: DataLoader<string, Category>
  ) {
    return from(categoriesLoader.load(id)).pipe(
      concatMap(value => {
        if (!value) return throwError(new NotFoundException('Category not found'))
        return of(value)
      })
    )
  }

  @Mutation(returns => Category)
  createCategory(@Args('data') category: CategoryCreateInput) {
    return this.categoriesService.create(category)
  }

  @Mutation(returns => Category)
  updateCategory(@Args({ name: '_id', type: () => String }) id: string, @Args('data') data: CategoryUpdateInput) {
    return this.categoriesService.updateById(id, data)
  }

  @Mutation(returns => Category)
  deleteCategory(@Args({ name: '_id', type: () => String }) id: string) {
    return this.categoriesService.deleteById(id)
  }
}
