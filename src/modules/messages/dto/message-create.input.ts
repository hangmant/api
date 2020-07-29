import { Field, InputType, ID } from '@nestjs/graphql'

@InputType()
export class MessageCreateInput {
  @Field({ description: 'body of message in text plain or markdown ' })
  text: string

  /** This is setted getting id of the authenticated user */
  fromUser: string

  @Field(type => ID)
  roomId: string
}
