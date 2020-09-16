import { Injectable, NotFoundException } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { RoomCreateInput } from './dto/room-create.input'
import { RoomUpdateInput } from './dto/room-update.input'
import { Room } from './models/room.model'

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room) private readonly roomModel: ReturnModelType<typeof Room>) {}

  async findByIds(ids: string[]): Promise<Room[]> {
    return this.roomModel.find({ _id: { $in: ids } }).lean()
  }

  async findById(id: string): Promise<Room> {
    const room = await this.roomModel.findById(id).lean()
    if (!room) {
      throw new NotFoundException('Room not found')
    }
    return room
  }

  async create(data: RoomCreateInput): Promise<Room> {
    return this.roomModel.create(data)
  }

  async updateById(id: string, data: RoomUpdateInput): Promise<Room> {
    await this.findById(id)

    return this.roomModel
      .findByIdAndUpdate(
        id,
        {
          $set: data
        },
        {
          new: true
        }
      )
      .lean()
  }
}
