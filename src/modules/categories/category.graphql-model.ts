import { Field, ObjectType, ID } from '@nestjs/graphql'

@ObjectType()
export class CategoryGraphQLModel {
  @Field(type => ID)
  _id: string

  @Field(type => String)
  name: string

  @Field(type => String, { nullable: true })
  color?: string

  @Field(type => String, { nullable: true })
  description?: string
}
