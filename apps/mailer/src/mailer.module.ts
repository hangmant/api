import { Module } from '@nestjs/common';
import { MailerController } from './mailer.tcp.controller';
import { MailerService } from './mailer.service';
import { MailerModule as ExternalMailerModule } from '@nestjs-modules/mailer';
import { MailerOptions } from './options/mailer.options';

@Module({
  imports: [
    ExternalMailerModule.forRootAsync({
      useClass: MailerOptions,
    }),
  ],
  controllers: [MailerController],
  providers: [MailerService],
})
export class MailerModule {}
