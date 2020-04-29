import { Args, Mutation, Query, Resolver, Parent, ResolveField } from '@nestjs/graphql'
import { WordsService } from './words.service'
import { CreateWord } from './interface/createWord.interface'
import { UpdateWord } from './interface/updateWord.interface'
import * as DataLoader from 'dataloader'
import { Category } from '../categories/categories.model'
import { Word } from './words.model'
import { Loader } from 'nestjs-dataloader-dan'
import { CategoriesLoader } from '../categories/categories.loader'
import { from, Observable } from 'rxjs'
import { WordsGraphQLModel } from './words.graphql-model'

@Resolver(of => WordsGraphQLModel)
export class WordsResolver {
  constructor(private readonly wordsService: WordsService) {}

  @Query()
  words() {
    return this.wordsService.findAll()
  }

  @Query()
  randomWords(@Args('categoryId') categoryId: string, @Args('limit') limit: number) {
    return this.wordsService.getRandomWords(categoryId, limit)
  }

  @Query()
  word(@Args('_id') _id) {
    return this.wordsService.findById(_id)
  }

  @Mutation()
  createWord(@Args('data') word: CreateWord) {
    return this.wordsService.create(word)
  }

  @Mutation()
  updateWord(@Args('_id') _id: string, @Args('data') wordData: UpdateWord) {
    return this.wordsService.updateById(_id, wordData)
  }

  @Mutation()
  deleteWord(@Args('_id') _id: string) {
    return this.wordsService.deleteById(_id)
  }

  @ResolveField('category', () => Category)
  resolveCategory(
    @Parent() word: Word,
    @Loader(CategoriesLoader.name) categoriesLoader: DataLoader<string, Category>
  ): Observable<Category | null> {
    return from(categoriesLoader.load(word.category.toString()))
  }
}
