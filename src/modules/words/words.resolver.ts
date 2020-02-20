import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { WordsService } from './words.service'
import { CreateWord } from './interface/createWord.interface'

@Resolver('Word')
export class WordsResolver {
  constructor(private readonly wordsService: WordsService) {}

  @Query()
  words() {
    return this.wordsService.findAll()
  }

  @Mutation()
  createWord(@Args('data') word: CreateWord) {
    return this.wordsService.create(word)
  }
}
