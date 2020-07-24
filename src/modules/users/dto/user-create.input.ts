import { Field, InputType } from '@nestjs/graphql'
import { CountryInput } from '../../countries/dto/country.input'

@InputType()
export class UserCreateInput {
  @Field({ nullable: true })
  username?: string

  @Field({ nullable: true })
  firstName: string

  @Field({ nullable: true })
  lastName: string

  @Field({ nullable: true })
  phone?: string

  @Field({ nullable: true })
  address?: string

  @Field({ nullable: true })
  country?: CountryInput

  @Field({ nullable: true })
  email: string

  @Field({ nullable: true })
  password: string

  @Field({ nullable: true })
  avatar?: string
}
