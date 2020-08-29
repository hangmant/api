import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypegooseModuleOptions, TypegooseOptionsFactory } from 'nestjs-typegoose'
import { LoggerService } from '../logger/logger.service'

@Injectable()
export class MongoConfigService implements TypegooseOptionsFactory {
  constructor(private readonly configService: ConfigService, private readonly logger: LoggerService) {}

  createTypegooseOptions(): TypegooseModuleOptions {
    const mongoDBUrl = this.configService.get('mongoDBUrl')
    this.logger.info(`Connecting to ${mongoDBUrl}`)
    return {
      uri: mongoDBUrl,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true
    }
  }
}
