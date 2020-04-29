import { Field, ObjectType, ID } from '@nestjs/graphql'
import { CategoryGraphQLModel } from '../categories/category.graphql-model'

@ObjectType()
export class Words {
  @Field(type => ID)
  _id: string

  @Field(type => String)
  name: string

  @Field(type => [CategoryGraphQLModel])
  posts: CategoryGraphQLModel[]
}
