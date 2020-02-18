import { Module } from '@nestjs/common'
import { MongoModule } from '../mongo/mongo.module'
import { Word } from './words.model'
import { WordsService } from './words.service'
import { WordsResolver } from './words.resolver'

@Module({
  imports: [MongoModule.forFeature([Word])],
  providers: [WordsResolver, WordsService],
  exports: [WordsService]
})
export class WordsModule {}
