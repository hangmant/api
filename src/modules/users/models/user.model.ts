import { prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { IsEmail, IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator'
import { Country } from '../../countries/models/country.model'
import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class User extends TimeStamps {
  @Field(type => ID)
  _id: string

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @prop({ maxlength: 20 })
  username?: string

  @Field()
  @IsString()
  @IsNotEmpty()
  @prop({ required: true, maxlength: 30 })
  firstName: string

  @Field()
  @IsString()
  @IsNotEmpty()
  @prop({ required: true, maxlength: 50 })
  lastName: string

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @prop({ maxlength: 24 })
  phone?: string

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @prop()
  address?: string

  @Field(type => Country)
  @IsOptional()
  @prop()
  country?: Country

  @Field()
  @IsEmail()
  @IsNotEmpty()
  @prop({ required: true, maxlength: 60 })
  email: string

  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  @Field({ nullable: true })
  @prop()
  isEmailVerified?: boolean

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @prop()
  avatar?: string

  @IsString()
  @IsNotEmpty()
  @prop({ required: true })
  password: string
}
