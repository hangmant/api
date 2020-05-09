import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from '../../guards/gqlAuth.guard'
import { User } from './users.model'
import { UsersService } from './users.service'
import { CurrentUser } from '../../decorators/currentUser.decorator'

@Resolver('User')
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query()
  user(@Args('_id') _id: string) {
    return this.userService.findById(_id)
  }

  @UseGuards(GqlAuthGuard)
  @Query()
  me(@CurrentUser() user) {
    return this.userService.findById(user._id)
  }

  @Mutation()
  createUser(@Args('data') user: User) {
    return this.userService.create(user)
  }
}
