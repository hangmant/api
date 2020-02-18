import { prop } from '@typegoose/typegoose'
import { IsString } from 'class-validator'

export class Word {
  @IsString()
  @prop({ required: true })
  name: string
}
