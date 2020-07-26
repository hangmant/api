import { Module } from '@nestjs/common'
import { MongoModule } from '../mongo/mongo.module'
import { MessagesResolver } from './messages.resolver'
import { MessagesService } from './messages.service'
import { Message } from './models/message.model'

@Module({
  imports: [MongoModule.forFeature([Message])],
  providers: [MessagesResolver, MessagesService]
})
export class MessagesModule {}
