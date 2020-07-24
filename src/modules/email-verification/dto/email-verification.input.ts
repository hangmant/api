import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class EmailVerificationInput {
  @IsString()
  @Field()
  token: string
}
