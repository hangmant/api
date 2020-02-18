import { DynamicModule, Global, Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import {} from '@typegoose/typegoose'
import { MongoConfigService } from './mongoConfig.service'

@Global()
@Module({
  imports: [
    TypegooseModule.forRootAsync({
      useClass: MongoConfigService
    })
  ]
})
export class MongoModule {
  static forFeature(items: any[]): DynamicModule {
    return {
      module: MongoModule,
      imports: [TypegooseModule.forFeature(items)],
      exports: [TypegooseModule.forFeature(items)]
    }
  }
}
