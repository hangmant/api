import { Field, ObjectType } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { RoomType } from '../constants';

export type RoomDocument = Room & Document;
@Schema({
  timestamps: true,
})
@ObjectType()
export class Room {
  @Field()
  _id: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field((type) => [String])
  @Prop()
  users?: string[];

  @Field((type) => RoomType)
  @Prop({ type: String, enum: Object.keys(RoomType), required: true })
  type: RoomType;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
