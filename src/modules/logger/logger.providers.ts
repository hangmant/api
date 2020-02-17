import { Provider } from '@nestjs/common'
import { LoggerService } from './logger.service'

export const loggerServiceInstance = new LoggerService()

export const loggerProviders: Array<Provider> = [
  {
    provide: LoggerService,
    useValue: loggerServiceInstance
  }
]
