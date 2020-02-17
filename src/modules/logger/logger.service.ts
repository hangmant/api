import { LoggerService as NestLoggerService } from '@nestjs/common'
import * as bunyan from 'bunyan'
import { join } from 'path'
import PrettyStream = require('bunyan-prettystream')

export class LoggerService implements NestLoggerService {
  private readonly _logger: bunyan

  constructor() {
    const packageJson = require(join(process.cwd(), 'package.json'))
    const prettyStream = new PrettyStream()

    prettyStream.pipe(process.stdout)

    this._logger = bunyan.createLogger({
      name: packageJson.name.toUpperCase(),
      streams: [
        {
          level: 'debug',
          type: 'raw',
          stream: prettyStream
        }
      ]
    })
  }

  log(message: any, ...params: Array<any>) {
    this._logger.info(message, params)
  }

  info(message: any, ...params: Array<any>) {
    this._logger.info(message, params)
  }

  error(message: string, trace?: string) {
    if (trace) {
      this._logger.error(message, trace)
    }
    this._logger.error(message)
  }

  warn(message: string, ...params: Array<any>) {
    this._logger.warn(message, params)
  }
}
