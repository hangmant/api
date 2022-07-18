import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsHexColor, IsString } from 'class-validator';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({
  timestamps: true,
})
@ObjectType()
export class Category {
  @Field()
  _id: string;

  @IsString()
  @Field()
  @Prop({ required: true })
  name: string;

  @IsHexColor()
  @IsString()
  @Field()
  @Prop({
    default: '#000000', // black color
  })
  color: string;

  @IsString()
  @Field()
  @Prop({
    default: '',
  })
  description: string;

  @Field((type) => Date)
  readonly createdAt: Date;

  @Field((type) => Date)
  readonly updatedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
