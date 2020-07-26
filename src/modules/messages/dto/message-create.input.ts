import { Field, InputType, ID } from '@nestjs/graphql'

@InputType()
export class MessageCreateInput {
  @Field({ description: 'body of message in text plain or markdown ' })
  text: string

  @Field(type => ID)
  fromUser: string

  @Field(type => ID)
  roomId: string
}
