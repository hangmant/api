import { IsHexColor, IsString } from 'class-validator'

export class UpdateCategoryDto {
  name?: string

  @IsHexColor()
  @IsString()
  color?: string

  description?: string
}
