import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CategoriesLoader } from '../categories/categories.loader'
import { CategoriesModule } from '../categories/categories.module'
import { Word, WordSchema } from './models/words.model'
import { WordsResolver } from './words.resolver'
import { WordsService } from './words.service'

@Module({
  imports: [    MongooseModule.forFeature([{ name: Word.name, schema:WordSchema }])
  , CategoriesModule],
  providers: [WordsResolver, WordsService, CategoriesLoader],
  exports: [WordsService]
})
export class WordsModule {}
