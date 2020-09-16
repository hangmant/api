import { prop } from '@typegoose/typegoose'
import { IsString, IsHexColor } from 'class-validator'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class Category extends TimeStamps {
  @Field()
  _id: string

  @IsString()
  @Field()
  @prop({ required: true })
  name: string

  @IsHexColor()
  @IsString()
  @Field()
  @prop({
    default: '#000000' // black color
  })
  color: string

  @IsString()
  @Field()
  @prop({
    default: ''
  })
  description: string

  @Field(type => Date)
  createdAt: Date

  @Field(type => Date)
  updatedAt: Date
}
