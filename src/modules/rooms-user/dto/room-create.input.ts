import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class RoomCreateInput {
  @Field(type => ID)
  roomId: string

  @Field(type => ID)
  userId: string
}
