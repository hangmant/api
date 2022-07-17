import { IsHexColor, IsString } from 'class-validator'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CategoryCreateInput {
  @Field()
  name: string

  @IsHexColor()
  @IsString()
  @Field()
  color?: string

  @Field()
  description: string
}
