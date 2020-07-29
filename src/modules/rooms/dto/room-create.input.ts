import { Field, InputType } from '@nestjs/graphql'
import { RoomType } from '../constants'

@InputType()
export class RoomCreateInput {
  @Field()
  name: string

  @Field(type => [String], { nullable: true })
  users?: string[]

  @Field(type => RoomType)
  type: RoomType
}
