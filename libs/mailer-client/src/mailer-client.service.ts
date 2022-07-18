import { ISendMailOptions } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MAILER_CLIENT_PROVIDER } from './mailer-client.constants';
import { tap } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MailerClientService {
  constructor(
    @Inject(MAILER_CLIENT_PROVIDER)
    private readonly clientProxy: ClientProxy,
  ) {}

  async sendMail(options: ISendMailOptions) {
    return firstValueFrom(this.clientProxy.send({ cmd: 'sendMail' }, options));
  }
}
