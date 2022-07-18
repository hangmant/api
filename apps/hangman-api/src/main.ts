import { createService } from '@hangster/setup';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

createService(AppModule, (app) => {
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: process.env.MAILER__TCP__HOST,
      port: parseInt(process.env.MAILER__TCP__PORT),
    },
  });
});
