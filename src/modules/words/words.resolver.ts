import { Query, Resolver } from '@nestjs/graphql'
import { WordsService } from './words.service'

@Resolver('Word')
export class WordsResolver {
  constructor(private readonly wordsService: WordsService) {}

  @Query()
  words() {
    return this.wordsService.findAll()
  }
}
