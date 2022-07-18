import 'dotenv/config';

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SetupModule } from '../setup.module';
import { applyMiddleware } from './apply-middleware.helper';

export async function createService(
  appModule: any,
  preListenHook?: (
    app: NestFastifyApplication,
    configService: ConfigService,
  ) => void | Promise<void>,
) {
  const app = await NestFactory.create<NestFastifyApplication>(
    SetupModule.register(appModule),
    new FastifyAdapter(),
    {},
  );

  applyMiddleware(app);

  const configService = app.get<ConfigService>(ConfigService);

  if (preListenHook) await preListenHook(app, configService);

  console.log('Starting service...');

  await app.listen(configService.get('port'), configService.get('host'));

  if (configService.get('env') === 'dev' || true) {
    const logger = console;
    logger.info(
      `Listening on port http://${configService.get(
        'host',
      )}:${configService.get('port')}/api`,
    );
    logger.info(
      `GraphQL Playground listening on port http://${configService.get(
        'host',
      )}:${configService.get('port')}/graphql`,
    );
  }
}
