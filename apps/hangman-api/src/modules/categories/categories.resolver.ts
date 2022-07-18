import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import * as DataLoader from 'dataloader';
import { Loader } from '@dantehemerson/nestjs-dataloader';
import { throwError } from 'rxjs';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { CategoriesLoader } from './categories.loader';
import { CategoriesService } from './categories.service';
import { CategoryCreateInput } from './dto/category-create.input';
import { CategoryUpdateInput } from './dto/category-update.input';
import { Category } from './models/categories.model';

@UseGuards(GqlAuthGuard)
@Resolver((of) => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query((returns) => [Category])
  categories() {
    return this.categoriesService.findAll();
  }

  @Query((returns) => Category)
  async category(
    @Args({ name: '_id', type: () => ID }) id: string,
    @Loader(CategoriesLoader) categoriesLoader: DataLoader<string, Category>,
  ) {
    const category = await categoriesLoader.load(id);
    if (!category)
      return throwError(new NotFoundException('Category not found'));
    return category;
  }

  @Mutation((returns) => Category)
  createCategory(@Args('data') category: CategoryCreateInput) {
    return this.categoriesService.create(category);
  }

  @Mutation((returns) => Category)
  updateCategory(
    @Args({ name: '_id', type: () => ID }) id: string,
    @Args('data') data: CategoryUpdateInput,
  ) {
    return this.categoriesService.updateById(id, data);
  }

  @Mutation((returns) => Category)
  deleteCategory(@Args({ name: '_id', type: () => ID }) id: string) {
    return this.categoriesService.deleteById(id);
  }
}
