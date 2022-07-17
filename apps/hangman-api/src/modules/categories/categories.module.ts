import { DataLoaderInterceptor } from '@dantehemerson/nestjs-dataloader'
import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { MongooseModule } from '@nestjs/mongoose'
import { CategoriesLoader } from './categories.loader'
import { CategoriesResolver } from './categories.resolver'
import { CategoriesService } from './categories.service'
import { Category, CategorySchema } from './models/categories.model'

@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),],
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
