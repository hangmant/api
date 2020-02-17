import { DynamicModule, Global, Module } from '@nestjs/common'
import { MongooseModule as NestMongooseModule } from '@nestjs/mongoose'
import { MongoItemConfig } from './interfaces/mongoItemConfig'
import { MongoConfigService } from './mongoConfig.service'

@Global()
@Module({
  imports: [
    NestMongooseModule.forRootAsync({
      useClass: MongoConfigService
    })
  ]
})
export class MongoModule {
  static forRoot(items: Array<MongoItemConfig>): DynamicModule {
    return {
      module: MongoModule,
      imports: [NestMongooseModule.forFeature(items)],
      exports: [NestMongooseModule.forFeature(items)]
    }
  }
}
