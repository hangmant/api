import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document } from 'mongoose'
import { User } from '../../../modules/users/models/user.model'
import { Room } from '../../rooms/models/room.model'


export type MessageDocument = Message & Document;

@Schema({
  timestamps: true
})
@ObjectType()
export class Message {
  @Field()
  _id: string

  @Field({ description: 'body of message in text plain or markdown ' })
  @Prop({ required: true })
  text: string

  @Field({ description: 'field <text> parsed to html' })
  @Prop({ required: true })
  html: string

  @Field(type => User)
  @Prop({   type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
     index: true })
  fromUser: User

  @Field(type => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId,
    ref: Room.name, required: true, index: true })
  roomId: Room

  @Field(type => Date)
  createdAt: Date

  @Field(type => Date)
  updatedAt: Date
}


export const MessageSchema = SchemaFactory.createForClass(Message);
