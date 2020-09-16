import { Module } from '@nestjs/common'
import { MongoModule } from '../mongo/mongo.module'
import { Word } from './models/words.model'
import { WordsService } from './words.service'
import { WordsResolver } from './words.resolver'
import { CategoriesModule } from '../categories/categories.module'

@Module({
  imports: [MongoModule.forFeature([Word]), CategoriesModule],
  providers: [WordsResolver, WordsService],
  exports: [WordsService]
})
export class WordsModule {}
