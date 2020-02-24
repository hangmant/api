import { prop } from '@typegoose/typegoose'
import { IsString, IsHexColor } from 'class-validator'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export class Category extends TimeStamps {
  @IsString()
  @prop({ required: true })
  name: string

  @IsHexColor()
  @IsString()
  @prop({
    default: '#000000' // black color
  })
  color: string

  @IsString()
  @prop({
    default: ''
  })
  description: string
}
