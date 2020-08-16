import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { from, Observable } from 'rxjs'
import { User } from '../../../modules/users/models/user.model'
import { UsersService } from '../../../modules/users/users.service'
import { RoomCreateInput } from '../dto/room-create.input'
import { RoomUser } from '../models/room-user.model'

@Injectable()
export class RoomsUserService {
  constructor(
    @InjectModel(RoomUser) private readonly roomUserModel: ReturnModelType<typeof RoomUser>,
    private readonly usersService: UsersService
  ) {}

  findById(id: string): Observable<RoomUser | null> {
    return from(this.roomUserModel.findById(id).lean())
  }

  create(roomUser: RoomCreateInput): Observable<RoomUser> {
    return from(this.roomUserModel.create(roomUser))
  }

  async findRoomUsers(roomId: string): Promise<User[]> {
    const userIds: string[] = await this.roomUserModel.distinct('userId', { roomId }).lean()
    console.log('Dante: RoomsUserService -> userIds', userIds)
    const res = await this.usersService.findByIds(userIds).toPromise()
    console.log('Dante: RoomsUserService -> res', res)
    return res
  }
}
