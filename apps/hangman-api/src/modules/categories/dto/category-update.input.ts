import { IsHexColor, IsString, IsOptional } from 'class-validator'
import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CategoryUpdateInput {
  @IsOptional()
  @Field({ nullable: true })
  name?: string

  @IsOptional()
  @IsHexColor()
  @IsString()
  @Field({ nullable: true })
  color?: string

  @IsOptional()
  @Field({ nullable: true })
  description?: string
}
