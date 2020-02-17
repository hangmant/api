import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as BluebirdPromise from 'bluebird'
import * as helmet from 'helmet'
import * as mongoose from 'mongoose'
import * as passport from 'passport'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { config } from './config'
import { loggerServiceInstance } from './modules/logger/logger.providers'
import { LoggerModule } from './modules/logger/logger.module'
import { LoggerService } from './modules/logger/logger.service'
;(mongoose as any).Promise = BluebirdPromise

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    logger: loggerServiceInstance
  })

  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()
  app.setGlobalPrefix('/api')
  app.use(helmet())

  // Passport
  app.use(passport.initialize())
  app.use(passport.session())

  // Swagger
  const options = new DocumentBuilder()
    .setTitle('Hangman API')
    .setDescription('')
    .setVersion('0.0.1')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  await app.listen(config.port)

  if (config.env === 'dev' || true) {
    const logger = app.select(LoggerModule).get(LoggerService)
    logger.info(`Listening on port http://localhost:${config.port}/api`)
    logger.info(`GraphQL Playground listening on port http://localhost:${config.port}/graphql`)
  }
}

bootstrap()
