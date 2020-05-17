import { prop } from '@typegoose/typegoose'
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator'

export class CountryModel {
  @IsString()
  @IsNotEmpty()
  @prop()
  name: string

  @IsOptional()
  @IsString()
  @IsUrl()
  @prop()
  flag?: string

  @IsString()
  @IsNotEmpty()
  @prop()
  alpha2Code: string
}
