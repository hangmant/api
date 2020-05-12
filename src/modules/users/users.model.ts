import { prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator'

export class User extends TimeStamps {
  @IsString()
  @IsOptional()
  @prop({ maxlength: 20 })
  username?: string

  @IsString()
  @IsNotEmpty()
  @prop({ required: true, maxlength: 30 })
  firstName: string

  @IsString()
  @IsNotEmpty()
  @prop({ required: true, maxlength: 50 })
  lastName: string

  @IsString()
  @IsOptional()
  @prop({ maxlength: 24 })
  phone?: string

  @IsString()
  @IsOptional()
  @prop()
  address?: string

  @IsString()
  @IsOptional()
  @prop()
  country?: string

  @IsEmail()
  @IsNotEmpty()
  @prop({ required: true, maxlength: 60 })
  email: string

  @IsString()
  @IsNotEmpty()
  @prop({ required: true })
  password: string
}
