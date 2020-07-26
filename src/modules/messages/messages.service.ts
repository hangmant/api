import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { from, Observable } from 'rxjs'
import { MessageCreateInput } from './dto/message-create.input'
import { MessageUpdateInput } from './dto/message-update.input'
import { Message } from './models/message.model'

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message) private readonly messageModel: ReturnModelType<typeof Message>) {}

  findById(id: string): Observable<Message | null> {
    return from(this.messageModel.findById(id).lean())
  }

  create(message: MessageCreateInput): Observable<Message> {
    return from(this.messageModel.create(message))
  }

  updateById(id: string, message: MessageUpdateInput): Observable<Message | null> {
    return from(
      this.messageModel
        .findByIdAndUpdate(
          id,
          {
            $set: message
          },
          {
            new: true
          }
        )
        .lean()
    )
  }
}
