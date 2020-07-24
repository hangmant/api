import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class WorldUpdateInput {
  @Field()
  name: string
}
