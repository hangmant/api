import { IsString } from 'class-validator'

export class EmailVerificationReqDto {
  @IsString()
  token: string
}
