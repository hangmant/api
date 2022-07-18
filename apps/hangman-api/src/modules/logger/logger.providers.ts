import { Provider } from '@nestjs/common';
import { LoggerService } from './logger.service';

export const loggerProviders: Array<Provider> = [
  {
    provide: LoggerService,
    useValue: new LoggerService(),
  },
];
