import { prop, Ref } from '@typegoose/typegoose'
import { IsString, IsNotEmpty, IsMongoId } from 'class-validator'
import { Category } from '../categories/categories.model'

export class Word {
  @IsString()
  @IsNotEmpty()
  @prop({ required: true })
  name: string

  @IsMongoId()
  @IsNotEmpty()
  @prop({ ref: 'Category' })
  category: Ref<Category>
}
