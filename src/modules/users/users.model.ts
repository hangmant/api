import { prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class User extends TimeStamps {
  @IsString()
  @IsNotEmpty()
  @prop({ required: true, maxlength: 20 })
  name: string

  @IsNotEmpty()
  @IsEmail()
  @prop({ required: true, maxlength: 60 })
  email: string

  @IsString()
  @IsNotEmpty()
  @prop({ required: true })
  password: string
}
