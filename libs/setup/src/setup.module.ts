import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '@hangster/config';
console.log('🤫 Dante ➤ ConfigModule', ConfigModule);

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
