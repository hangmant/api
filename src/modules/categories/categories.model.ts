import { prop } from '@typegoose/typegoose'
import { IsString } from 'class-validator'

export class Category {
  @IsString()
  @prop({ required: true })
  name: string

  @IsString()
  @prop()
  description: string
}
