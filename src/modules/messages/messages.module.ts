import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { RoomsModule } from '../rooms/rooms.module'
import { TextProcessorModule } from '../text-processor/text-processor.module'
import { UserModule } from '../users/users.module'
import { MessagesResolver } from './messages.resolver'
import { MessagesService } from './messages.service'
import { Message, MessageSchema } from './models/message.model'

@Module({
  imports: [    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }])
  , UserModule, RoomsModule, TextProcessorModule],
  providers: [MessagesResolver, MessagesService]
})
export class MessagesModule {}
