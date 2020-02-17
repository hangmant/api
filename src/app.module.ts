import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { AuthModule } from './modules/auth/auth.module'
import { LoggerModule } from './modules/logger/logger.module'
import { GraphqlOptions } from './graphql.options'
import { CommonModule } from './modules/common/common.module'

@Module({
  imports: [
    LoggerModule,
    CommonModule,
    GraphQLModule.forRootAsync({
      useClass: GraphqlOptions
    }),
    AuthModule
  ]
})
export class AppModule {}
