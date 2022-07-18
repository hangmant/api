import { Module } from '@nestjs/common';
import { ConfigModule as ExternalConfigModule } from '@nestjs/config';
import { globalConfigLoader } from './loaders/global-config.loader';

@Module({
  imports: [
    ExternalConfigModule.forRoot({
      isGlobal: true,
      load: [globalConfigLoader],
    }),
  ],
})
export class ConfigModule {}
