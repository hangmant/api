import { ValidationPipe } from '@nestjs/common'
import { NestFastifyApplication } from '@nestjs/platform-fastify'
import * as BluebirdPromise from 'bluebird'
import * as helmet from 'helmet'
import * as passport from 'passport'

/** set custom promise to mongoose */
require('mongoose').Promise = BluebirdPromise

export async function applyMiddleware(app: NestFastifyApplication) {
  // await app.register(require('@fastify/express'))
 
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    origin: '*',
    credentials: true,
  })
  app.setGlobalPrefix('/api')
  app.use(helmet())

  // Passport
  app.use(passport.initialize())
  app.use(passport.session())
}
