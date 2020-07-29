import { prop, Ref } from '@typegoose/typegoose'
import { IsString, IsNotEmpty, IsMongoId, MaxLength, MinLength } from 'class-validator'
import { Category } from '../categories/models/categories.model'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class Word extends TimeStamps {
  @Field()
  _id: string

  @IsString()
  @Field()
  @prop({ required: true, maxlength: 20 })
  name: string

  @IsMongoId()
  @IsNotEmpty()
  @Field(type => Category)
  @prop({ ref: 'Category', required: true })
  category: Ref<Category>
}
