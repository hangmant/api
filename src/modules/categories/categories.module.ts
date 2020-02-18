import { Module } from '@nestjs/common'
import { MongoModule } from '../mongo/mongo.module'
import { Category } from './categories.model'
import { CategoriesService } from './categories.service'
import { CategoriesResolver } from './categories.resolver'

@Module({
  imports: [MongoModule.forFeature([Category])],
  providers: [CategoriesResolver, CategoriesService],
  exports: [CategoriesService]
})
export class CategoriesModule {}
