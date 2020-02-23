import { prop } from '@typegoose/typegoose'
import { IsString, IsHexColor } from 'class-validator'

export class Category {
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
