import { ValidationPipe } from '@nestjs/common'
import { NestFastifyApplication } from '@nestjs/platform-fastify'
import * as BluebirdPromise from 'bluebird'
import * as helmet from 'helmet'
import * as passport from 'passport'

/** set custom promise to mongoose */
require('mongoose').Promise = BluebirdPromise

export function applyMiddleware(app: NestFastifyApplication) {
  app.useGlobalPipes(new ValidationPipe())
  // app.enableCors()
  app.setGlobalPrefix('/api')
  app.use(helmet())

  // Passport
  app.use(passport.initialize())
  app.use(passport.session())
}
