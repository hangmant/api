import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../decorators/currentUser.decorator';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { UserUpdateInput } from './dto/user-update.input';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { of } from 'rxjs';
import { UserCreateInput } from './dto/user-create.input';
import { EmailVerifyResponse } from '../email-verification/dto/email-verify-response.type';
import { EmailVerificationSenderService } from '../email-verification-sender/email-verification-sender.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(
    private readonly userService: UsersService,
    private readonly emailVerificationSenderService: EmailVerificationSenderService,
  ) {}

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

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => EmailVerifyResponse)
  async sendVerificationMail(@CurrentUser() user) {
    console.log(
      '🤫 Dante ➤ EmailVerificationResolver ➤ sendVerificationMail ➤ user',
      user,
    );
    const result =
      await this.emailVerificationSenderService.sendVerificationToken(
        user.email,
      );
    console.log(
      '🤫 Dante ➤ UsersResolver ➤ sendVerificationMail ➤ result',
      result,
    );
    return {
      message: 'Verification email sent',
    };
  }
}
