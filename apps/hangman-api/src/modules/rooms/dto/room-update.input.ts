import { Field, InputType } from '@nestjs/graphql'
import { RoomType } from '../constants'

@InputType()
export class RoomUpdateInput {
  @Field({ nullable: true })
  name?: string

  @Field(type => [String], { nullable: true })
  users?: string[]

  @Field(type => RoomType, { nullable: true })
  type?: RoomType
}
