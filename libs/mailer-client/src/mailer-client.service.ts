import { ISendMailOptions } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MAILER_CLIENT_PROVIDER } from './mailer-client.constants';

@Injectable()
export class MailerClientService {
  constructor(
    @Inject(MAILER_CLIENT_PROVIDER)
    private readonly clientProxy: ClientProxy,
  ) {}

  async sendMail(options: ISendMailOptions) {
    return this.clientProxy.emit('send-mail', options);
  }
}
