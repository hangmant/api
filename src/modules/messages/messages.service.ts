import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { from, Observable } from 'rxjs'
import { concatMap } from 'rxjs/operators'
import { TextProcessorService } from '../text-processor/text-procesor.service'
import { GetMessagesArgs } from './dto/get-messages.args'
import { MessageCreateInput } from './dto/message-create.input'
import { MessageUpdateInput } from './dto/message-update.input'
import { Message } from './models/message.model'

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message) private readonly messageModel: ReturnModelType<typeof Message>,
    private readonly textProcessorService: TextProcessorService
  ) {}

  async find(args: GetMessagesArgs): Promise<Message[]> {
    return this.messageModel
      .find(args)
      .sort({
        createdAt: 1
      })
      .lean()
  }

  findById(id: string): Observable<Message | null> {
    return from(this.messageModel.findById(id).lean())
  }

  create(message: MessageCreateInput): Observable<Message> {
    return from(this.textProcessorService.processText(message.text)).pipe(
      concatMap(textProcessed => {
        return from(
          this.messageModel.create({
            ...message,
            html: textProcessed.html
          })
        )
      })
    )
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
