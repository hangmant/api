import { ArgsType, Field, ID } from '@nestjs/graphql'

@ArgsType()
export class GetMessagesArgs {
  @Field(type => ID)
  roomId: string
}
