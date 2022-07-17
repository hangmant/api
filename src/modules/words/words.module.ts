import { Module } from '@nestjs/common'
import { MongoModule } from '../mongo/mongo.module'
import { Word } from './models/words.model'
import { WordsService } from './words.service'
import { WordsResolver } from './words.resolver'
import { CategoriesModule } from '../categories/categories.module'
import { CategoriesLoader } from '../categories/categories.loader'

@Module({
  imports: [MongoModule.forFeature([Word]), CategoriesModule],
  providers: [WordsResolver, WordsService, CategoriesLoader],
  exports: [WordsService]
})
export class WordsModule {}
