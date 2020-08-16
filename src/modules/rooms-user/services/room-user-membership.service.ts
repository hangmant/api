import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { RoomUser } from '../models/room-user.model'

@Injectable()
export class RoomsUserMembershipService {
  constructor(@InjectModel(RoomUser) private readonly roomUserModel: ReturnModelType<typeof RoomUser>) {}

  async checkMembership(roomId: string, userId: string): Promise<boolean> {
    const roomUser = await this.roomUserModel.findById({ roomId, userId }).select('_id').lean()
    return Boolean(roomUser)
  }
}
