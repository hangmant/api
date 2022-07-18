import { Module, Global } from '@nestjs/common';
import { loggerProviders } from './logger.providers';

@Global()
@Module({
  providers: [...loggerProviders],
  exports: [...loggerProviders],
})
export class LoggerModule {}
