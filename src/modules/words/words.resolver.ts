import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { WordsService } from './words.service'
import { CreateWord } from './interface/createWord.interface'
import { UpdateWord } from './interface/updateWord.interface'

@Resolver('Word')
export class WordsResolver {
  constructor(private readonly wordsService: WordsService) {}

  @Query()
  words() {
    return this.wordsService.findAll()
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
}
