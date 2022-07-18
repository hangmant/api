import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoomUser, RoomUserDocument } from '../models/room-user.model';

@Injectable()
export class RoomsUserMembershipService {
  constructor(
    @InjectModel(RoomUser.name)
    private readonly roomUserModel: Model<RoomUserDocument>,
  ) {}

  async checkMembership(roomId: string, userId: string): Promise<boolean> {
    const roomUser = await this.roomUserModel
      .findById({ roomId, userId })
      .select('_id')
      .lean();
    return Boolean(roomUser);
  }
}
