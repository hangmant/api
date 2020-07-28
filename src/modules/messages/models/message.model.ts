import { Field, ObjectType, ID } from '@nestjs/graphql'
import { prop, Ref } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { Room } from '../../../modules/rooms/models/room.module'
import { User } from '../../../modules/users/models/user.model'

@ObjectType()
export class Message extends TimeStamps {
  @Field()
  _id: string

  @Field({ description: 'body of message in text plain or markdown ' })
  @prop({ required: true })
  text: string

  @Field({ description: 'field <text> parsed to html' })
  @prop({ required: true, default: '1212' })
  html: string

  @Field(type => User)
  @prop({ ref: 'User', required: true, index: true })
  fromUser: Ref<User>

  @Field(type => ID)
  @prop({ ref: 'Room', required: true, index: true })
  roomId: Ref<Room>
}
