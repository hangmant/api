import 'dotenv/config';

import { INestMicroservice } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  TcpOptions,
  Transport,
} from '@nestjs/microservices';

export async function createMicroservice(
  appModule: any,
  preListenHook?: (app: INestMicroservice) => void | Promise<void>,
) {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    appModule,
    {
      transport: Transport.TCP,
      options: {
        hort: process.env.MAILER__TCP__HOST,
        port: parseInt(process.env.MAILER__TCP__PORT),
      },
    } as TcpOptions,
  );

  if (preListenHook) await preListenHook(app);

  console.log('Starting microservice...');

  await app.listen();

  console.log('Service Listening on ', {
    hort: process.env.MAILER__TCP__HOST,
    port: parseInt(process.env.MAILER__TCP__PORT),
  });
}
