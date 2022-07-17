import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Schema, SchemaFactory } from '@nestjs/mongoose'
import { prop } from '@typegoose/typegoose'
import mongoose, { Document } from 'mongoose'
import { User } from '../../../modules/users/models/user.model'
import { Room } from '../../rooms/models/room.model'

export type RoomUserDocument = RoomUser & Document;

@Schema({
  timestamps: true
})
// TODO: @index({ roomId: 1, userId: 1 }, { unique: true })
@ObjectType()
export class RoomUser {
  @Field()
  _id: string

  @Field(type => ID)
  @prop({ type: mongoose.Schema.Types.ObjectId,
    ref: Room.name, required: true, index: true })
  roomId: Room

  @Field(type => ID)
  @prop({  type: mongoose.Schema.Types.ObjectId,
    ref: User.name, required: true, index: true })
  userId: User

  @Field(type => Date)
  createdAt: Date

  @Field(type => Date)
  updatedAt: Date
}

export const RoomUserSchema = SchemaFactory.createForClass(RoomUser);

