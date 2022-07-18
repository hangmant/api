import { Field, ObjectType } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Category } from '../../categories/models/categories.model';
import mongoose, { Document } from 'mongoose';

export type WordDocument = Word & Document;

@Schema({
  timestamps: true,
})
@ObjectType()
export class Word {
  @Field()
  _id: string;

  @IsString()
  @Field()
  @Prop({ required: true, maxlength: 20 })
  name: string;

  @IsMongoId()
  @IsNotEmpty()
  @Field((type) => Category)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Category.name,
    required: true,
  })
  category: Category;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;
}

export const WordSchema = SchemaFactory.createForClass(Word);
