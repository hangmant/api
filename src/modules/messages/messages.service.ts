import { Injectable, NotFoundException } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
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

  async find(data: GetMessagesArgs): Promise<Message[]> {
    return this.messageModel
      .find(data)
      .sort({
        createdAt: 1
      })
      .lean()
  }

  async findById(id: string): Promise<Message> {
    const message = await this.messageModel.findById(id).lean()
    if (!message) {
      throw new NotFoundException('Message not found')
    }
    return message
  }

  async create(message: MessageCreateInput): Promise<Message> {
    await this.roomService.findById(message.roomId)

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
