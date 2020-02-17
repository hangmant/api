import { Injectable } from '@nestjs/common'
import { MongooseOptionsFactory, MongooseModuleOptions } from '@nestjs/mongoose'
import { config } from '../../config'
import { LoggerService } from '../logger/logger.service'

@Injectable()
export class MongoConfigService implements MongooseOptionsFactory {
  constructor(private readonly logger: LoggerService) {}

  createMongooseOptions(): MongooseModuleOptions {
    this.logger.info(`Connecting to ${config.mongoDBUrl}`)
    return {
      uri: config.mongoDBUrl,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      retryDelay: 500,
      retryAttempts: 3,
      useUnifiedTopology: true
    }
  }
}
