import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { LoggerModule } from './modules/logger/logger.module'
import { LoggerService } from './modules/logger/logger.service'
import { applyMiddleware } from './utils/setup/apply-middleware'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    // logger: loggerServiceInstance
  })

  applyMiddleware(app)

  // Swagger
  const options = new DocumentBuilder().setTitle('Hangman API').setDescription('').setVersion('0.0.1').build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  const configService = app.get(ConfigService)

  await app.listen(configService.get('port'), configService.get('host'))

  if (configService.get('env') === 'dev' || true) {
    const logger = app.select(LoggerModule).get(LoggerService)
    logger.info(`Listening on port http://${configService.get('host')}:${configService.get('port')}/api`)
    logger.info(
      `GraphQL Playground listening on port http://${configService.get('host')}:${configService.get('port')}/graphql`
    )
  }
}

bootstrap()
