import { UseGuards } from '@nestjs/common'
import { Args, ID, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import * as DataLoader from 'dataloader'
import { Loader } from '@dantehemerson/nestjs-dataloader'
import { GqlAuthGuard } from '../../guards/gqlAuth.guard'
import { CategoriesLoader } from '../categories/categories.loader'
import { Category } from '../categories/models/categories.model'
import { WordCreateInput } from './dtos/word-create.input'
import { WordUpdateInput } from './dtos/word-update.input'
import { Word } from './models/words.model'
import { WordsService } from './words.service'

@UseGuards(GqlAuthGuard)
@Resolver(of => Word)
export class WordsResolver {
  constructor(private readonly wordsService: WordsService) {}

  @Query(returns => [Word])
  words() {
    return this.wordsService.findAll()
  }

  @Query(returns => [Word])
  randomWords(
    @Args({ name: 'categoryId', type: () => String }) categoryId: string,
    @Args({ name: 'limit', type: () => Int }) limit: number
  ) {
    return this.wordsService.getRandomWords(categoryId, limit)
  }

  @Query(returns => Word)
  word(@Args({ name: '_id', type: () => ID }) _id) {
    return this.wordsService.findById(_id)
  }

  @Mutation(returns => Word)
  createWord(@Args('data') word: WordCreateInput) {
    return this.wordsService.create(word)
  }

  @Mutation(returns => Word)
  updateWord(@Args({ name: '_id', type: () => ID }) _id: string, @Args('data') wordData: WordUpdateInput) {
    return this.wordsService.updateById(_id, wordData)
  }

  @Mutation(returns => Word)
  deleteWord(@Args({ name: '_id', type: () => ID }) _id: string) {
    return this.wordsService.deleteById(_id)
  }

  @ResolveField('category', () => Category)
  resolveCategory(
    @Parent() word: Word,
    @Loader(CategoriesLoader.name) categoriesLoader: DataLoader<string, Category>
  ): Promise<Category> {
    return categoriesLoader.load(word.category.toString())
  }
}
