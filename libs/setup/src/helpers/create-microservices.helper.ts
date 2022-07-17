import { INestMicroservice } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

export async function createMicroservice(appModule: any, preListenHook?: (app: INestMicroservice) => void | Promise<void>) {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    appModule,
    {
      transport: Transport.TCP
    }
  )

  if(preListenHook) await preListenHook(app)

  await app.listen()
}
