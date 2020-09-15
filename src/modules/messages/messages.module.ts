import { Module } from '@nestjs/common'
import { MongoModule } from '../mongo/mongo.module'
import { TextProcessorModule } from '../text-processor/text-processor.module'
import { UserModule } from '../users/users.module'
import { MessagesResolver } from './messages.resolver'
import { MessagesService } from './messages.service'
import { Message } from './models/message.model'
import { RoomsModule } from '../rooms/rooms.module'

@Module({
  imports: [MongoModule.forFeature([Message]), UserModule, RoomsModule, TextProcessorModule],
  providers: [MessagesResolver, MessagesService]
})
export class MessagesModule {}
