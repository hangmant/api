import { ConfigModule } from '@hangster/config';
import { DynamicModule, Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule],
})
export class SetupModule {
  static register(MainModule: any): DynamicModule {
    return {
      module: SetupModule,
      imports: [MainModule],
    };
  }
}
