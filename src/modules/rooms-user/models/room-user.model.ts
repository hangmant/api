import { Field, ObjectType } from '@nestjs/graphql'
import { prop, Ref } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { User } from 'src/modules/users/models/user.model'
import { Room } from '../../rooms/models/room.model'

@ObjectType()
export class RoomUser extends TimeStamps {
  @Field()
  _id: string

  @Field(type => Room)
  @prop({ ref: 'Room', required: true, index: true })
  roomId: Ref<Room>

  @Field(type => User)
  @prop({ ref: 'User', required: true, index: true })
  userId: Ref<User>
}
