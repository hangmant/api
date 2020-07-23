import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CountryInput {
  @Field()
  name: string

  @Field({ nullable: true })
  flag?: string

  @Field()
  alpha2Code: string
}
