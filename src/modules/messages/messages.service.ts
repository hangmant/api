import { Injectable, NotFoundException } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { from, Observable } from 'rxjs'
import { RoomsService } from '../rooms/rooms.service'
import { TextProcessorService } from '../text-processor/text-procesor.service'
import { GetMessagesArgs } from './dto/get-messages.args'
import { MessageCreateInput } from './dto/message-create.input'
import { MessageUpdateInput } from './dto/message-update.input'
import { Message } from './models/message.model'

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message) private readonly messageModel: ReturnModelType<typeof Message>,
    private readonly roomService: RoomsService,
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

  async create(message: MessageCreateInput): Promise<Message> {
    const existsRoom = await this.roomService.findById(message.roomId).toPromise()
    if (!existsRoom) {
      throw new NotFoundException(`Room doesn'nt exists`)
    }

    const { html } = await this.textProcessorService.processText(message.text)

    return this.messageModel.create({
      ...message,
      html
    })
  }

  async updateById(id: string, message: MessageUpdateInput): Promise<Message> {
    const { html } = await this.textProcessorService.processText(message.text)

    const updatedMessage = await this.messageModel
      .findByIdAndUpdate(
        id,
        {
          $set: {
            ...message,
            html
          }
        },
        {
          new: true
        }
      )
      .lean()

    if (!updatedMessage) {
      throw new NotFoundException('Messsage not found')
    }

    return updatedMessage
  }
}
