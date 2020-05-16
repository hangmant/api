import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { DataLoaderInterceptor } from 'nestjs-dataloader'
import { MongoModule } from '../mongo/mongo.module'
import { CategoriesLoader } from './categories.loader'
import { Category } from './categories.model'
import { CategoriesResolver } from './categories.resolver'
import { CategoriesService } from './categories.service'

@Module({
  imports: [MongoModule.forFeature([Category])],
  providers: [
    CategoriesResolver,
    CategoriesService,
    CategoriesLoader,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor
    }
  ],
  exports: [CategoriesLoader, CategoriesService]
})
export class CategoriesModule {}
