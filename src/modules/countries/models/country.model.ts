import { prop } from '@typegoose/typegoose'
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator'
import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class Country {
  @Field()
  _id?: string

  @Field()
  @IsString()
  @IsNotEmpty()
  @prop()
  name: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsUrl()
  @prop()
  flag?: string

  @Field()
  @IsString()
  @IsNotEmpty()
  @prop()
  alpha2Code: string
}
