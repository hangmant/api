import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { GraphqlOptions } from './graphql.options'
import { AuthModule } from './modules/auth/auth.module'
import { CategoriesModule } from './modules/categories/categories.module'
import { CommonModule } from './modules/common/common.module'
import { LoggerModule } from './modules/logger/logger.module'
import { StorageModule } from './modules/storage/storage.module'
import { UserModule } from './modules/users/users.module'
import { WordsModule } from './modules/words/words.module'

@Module({
  imports: [
    LoggerModule,
    CommonModule,
    GraphQLModule.forRootAsync({
      useClass: GraphqlOptions
    }),
    AuthModule,
    UserModule,
    WordsModule,
    StorageModule,
    CategoriesModule
  ]
})
export class AppModule {}
