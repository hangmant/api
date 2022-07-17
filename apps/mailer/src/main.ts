import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { MailerModule } from './mailer.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(MailerModule, new FastifyAdapter());
  await app.listen(3020);
}
bootstrap();
