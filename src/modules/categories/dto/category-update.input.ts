import { IsHexColor, IsString } from 'class-validator'
import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CategoryUpdateInput {
  @Field({ nullable: true })
  name?: string

  @IsHexColor()
  @IsString()
  @Field({ nullable: true })
  color?: string

  @Field()
  description?: string
}
