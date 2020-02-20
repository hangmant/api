import { prop, Ref } from '@typegoose/typegoose'
import { IsString, IsNotEmpty, IsMongoId, MaxLength, MinLength } from 'class-validator'
import { Category } from '../categories/categories.model'

export class Word {
  @IsString()
  @prop({ required: true, maxlength: 20 })
  name: string

  @IsMongoId()
  @IsNotEmpty()
  @prop({ ref: 'Category', required: true })
  category: Ref<Category>
}
