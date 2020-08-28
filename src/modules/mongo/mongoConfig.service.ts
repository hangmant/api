import { Injectable } from '@nestjs/common'
import { TypegooseOptionsFactory, TypegooseModuleOptions } from 'nestjs-typegoose'
import { config } from '../../config'
import { LoggerService } from '../logger/logger.service'

@Injectable()
export class MongoConfigService implements TypegooseOptionsFactory {
  constructor(private readonly logger: LoggerService) {}

  createTypegooseOptions(): TypegooseModuleOptions {
    this.logger.info(`Connecting to ${config.mongoDBUrl}`)
    return {
      uri: config.mongoDBUrl,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true
    }
  }
}
