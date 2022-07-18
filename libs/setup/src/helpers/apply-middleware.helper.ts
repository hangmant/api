import { ValidationPipe } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import * as passport from 'passport';

export async function applyMiddleware(app: NestFastifyApplication) {
  // await app.register(require('@fastify/express'))

  app.useGlobalPipes(new ValidationPipe());
  app.register(require('@fastify/cors'));
  app.setGlobalPrefix('/api');
  // app.use(helmet())

  // Passport
  app.use(passport.initialize());
  app.use(passport.session());
}
