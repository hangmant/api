import { ValidationPipe } from '@nestjs/common'
import { NestFastifyApplication } from '@nestjs/platform-fastify'
import * as BluebirdPromise from 'bluebird'
import helmet from 'helmet'
import * as passport from 'passport'

/** set custom promise to mongoose */
require('mongoose').Promise = BluebirdPromise

export async function applyMiddleware(app: NestFastifyApplication) {
  // await app.register(require('@fastify/express'))
 
  app.useGlobalPipes(new ValidationPipe())
  // app.register(require('@fastify/cors'))
  app.setGlobalPrefix('/api')
  // app.use(helmet())

  // // Passport
  // app.use(passport.initialize())
  // app.use(passport.session())
}
