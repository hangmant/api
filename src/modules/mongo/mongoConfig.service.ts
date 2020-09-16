import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypegooseModuleOptions, TypegooseOptionsFactory } from 'nestjs-typegoose'
import { LoggerService } from '../logger/logger.service'

@Injectable()
export class MongoConfigService implements TypegooseOptionsFactory {
  constructor(private readonly configService: ConfigService, private readonly logger: LoggerService) {}

  get mongoURI() {
    return this.configService.get('mongoDBUrl')
  }

  createTypegooseOptions(): TypegooseModuleOptions {
    this.logger.debug(`Connecting to ${this.mongoURI}`)
    return {
      uri: this.mongoURI,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true
    }
  }
}
