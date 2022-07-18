import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../decorators/currentUser.decorator';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { UserUpdateInput } from './dto/user-update.input';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { of } from 'rxjs';
import { UserCreateInput } from './dto/user-create.input';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query((returns) => User)
  user(@Args('_id') _id: string) {
    return this.userService.findById(_id);
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [User])
  users() {
    return this.userService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => User)
  me(@CurrentUser() user) {
    return this.userService.findById(user._id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => User)
  updateMe(@CurrentUser() authUser, @Args('data') user: UserUpdateInput) {
    return this.userService.update(authUser._id, user);
  }

  @Mutation((returns) => User)
  createUser(@Args('data') user: UserCreateInput) {
    return this.userService.create(user);
  }
}
