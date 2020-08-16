import { Field, ObjectType } from '@nestjs/graphql'
import { index, prop, Ref } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { User } from '../../../modules/users/models/user.model'
import { Room } from '../../rooms/models/room.model'

@index({ roomId: 1, userId: 1 }, { unique: true })
@ObjectType()
export class RoomUser extends TimeStamps {
  @Field()
  _id?: string

  @Field(type => Room)
  @prop({ ref: 'Room', required: true, index: true })
  roomId: Ref<Room>

  @Field(type => User)
  @prop({ ref: 'User', required: true, index: true })
  userId: Ref<User>
}
