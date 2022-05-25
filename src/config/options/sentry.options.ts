import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SentryModuleOptions, SentryOptionsFactory } from '@ntegral/nestjs-sentry'

@Injectable()
export class SentryOptions implements SentryOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createSentryModuleOptions(): SentryModuleOptions {
    const options = this.configService.get('sentry')
    return {
      dsn: options.dsn,
      debug: true,
      environment: 'dev',
      release: 'some_release',
      
    }
  }
}
