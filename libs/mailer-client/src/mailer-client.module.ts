import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MAILER_CLIENT_PROVIDER } from './mailer-client.constants';
import { MailerClientService } from './mailer-client.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MAILER_CLIENT_PROVIDER,
        transport: Transport.TCP,
        options: {
          host: process.env.MAILER__TCP__HOST,
          port: parseInt(process.env.MAILER__TCP__PORT),
        },
      },
    ]),
  ],
  providers: [MailerClientService],
  exports: [MailerClientService],
})
export class MailerClientModule {}
