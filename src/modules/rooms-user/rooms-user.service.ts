import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { from, Observable } from 'rxjs'
import { RoomCreateInput } from './dto/room-create.input'
import { RoomUser } from './models/room-user.model'

@Injectable()
export class RoomsUserService {
  constructor(@InjectModel(RoomUser) private readonly roomUserModel: ReturnModelType<typeof RoomUser>) {}

  findById(id: string): Observable<RoomUser | null> {
    return from(this.roomUserModel.findById(id).lean())
  }

  create(roomUser: RoomCreateInput): Observable<RoomUser> {
    return from(this.roomUserModel.create(roomUser))
  }
}
