import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { from, Observable } from 'rxjs'
import { RoomCreateInput } from './dto/room-create.input'
import { RoomUpdateInput } from './dto/room-update.input'
import { Room } from './models/room.module'

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room) private readonly roomModel: ReturnModelType<typeof Room>) {}

  findById(id: string): Observable<Room | null> {
    return from(this.roomModel.findById(id).lean())
  }

  create(room: RoomCreateInput): Observable<Room> {
    return from(this.roomModel.create(room))
  }

  updateById(id: string, room: RoomUpdateInput): Observable<Room | null> {
    return from(
      this.roomModel
        .findByIdAndUpdate(
          id,
          {
            $set: room
          },
          {
            new: true
          }
        )
        .lean()
    )
  }
}
