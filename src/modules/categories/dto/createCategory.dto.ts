import { IsHexColor, IsString } from 'class-validator'

export class CreateCategoryDto {
  name: string

  @IsHexColor()
  @IsString()
  color?: string

  description?: string
}
