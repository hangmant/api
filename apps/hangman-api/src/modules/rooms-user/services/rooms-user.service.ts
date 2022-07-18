import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { Room } from '../../../modules/rooms/models/room.model';
import { RoomsService } from '../../../modules/rooms/rooms.service';
import { User } from '../../../modules/users/models/user.model';
import { UsersService } from '../../../modules/users/users.service';
import { RoomUserCreateInput } from '../dto/room-user-create.input';
import { RoomUser, RoomUserDocument } from '../models/room-user.model';

@Injectable()
export class RoomsUserService {
  constructor(
    @InjectModel(RoomUser.name)
    private readonly roomUserModel: Model<RoomUserDocument>,
    private readonly usersService: UsersService,
    private readonly roomsService: RoomsService,
  ) {}

  findById(id: string): Observable<RoomUser | null> {
    return from(this.roomUserModel.findById(id).lean());
  }

  create(roomUser: RoomUserCreateInput): Observable<RoomUser> {
    return from(this.roomUserModel.create(roomUser));
  }

  async findRoomsForUser(userId: string): Promise<Room[]> {
    const roomIds: string[] = await this.roomUserModel
      .distinct('roomId', { userId })
      .lean();
    return this.roomsService.findByIds(roomIds);
  }

  async findRoomUsers(roomId: string): Promise<User[]> {
    const userIds: string[] = await this.roomUserModel
      .distinct('userId', { roomId })
      .lean();
    return this.usersService.findByIds(userIds);
  }
}
