import { prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { RoomType } from '../constants'
import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class Room extends TimeStamps {
  @Field()
  _id: string

  @Field()
  @prop({ required: true })
  name: string

  @Field(type => [String])
  @prop()
  users?: string[]

  @Field(type => RoomType)
  @prop({ enum: RoomType, required: true })
  type: RoomType
}
