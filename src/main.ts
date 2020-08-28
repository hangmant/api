import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { config } from './config'
import { LoggerModule } from './modules/logger/logger.module'
import { loggerServiceInstance } from './modules/logger/logger.providers'
import { LoggerService } from './modules/logger/logger.service'
import { applyMiddleware } from './utils/setup/apply-middleware'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    logger: loggerServiceInstance
  })

  applyMiddleware(app)

  // Swagger
  const options = new DocumentBuilder().setTitle('Hangman API').setDescription('').setVersion('0.0.1').build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  await app.listen(config.port, config.host)

  if (config.env === 'dev' || true) {
    const logger = app.select(LoggerModule).get(LoggerService)
    logger.info(`Listening on port http://${config.host}:${config.port}/api`)
    logger.info(`GraphQL Playground listening on port http://${config.host}:${config.port}/graphql`)
  }
}

bootstrap()
