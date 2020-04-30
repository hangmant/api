import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from './users.model'
import { UsersService } from './users.service'

@Resolver()
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query()
  user(@Args('_id') _id) {
    return this.userService.findById(_id)
  }

  @Mutation()
  createUser(@Args('data') user: User) {
    return this.userService.create(user)
  }
}
