import { UseGuards } from '@nestjs/common'
import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import * as DataLoader from 'dataloader'
import { Loader } from '@dantehemerson/nestjs-dataloader'
import { CurrentUser } from '../../decorators/currentUser.decorator'
import { GqlAuthGuard } from '../../guards/gqlAuth.guard'
import { User } from '../users/models/user.model'
import { UsersLoader } from '../users/users.loader'
import { GetMessagesArgs } from './dto/get-messages.args'
import { MessageCreateInput } from './dto/message-create.input'
import { MessageUpdateInput } from './dto/message-update.input'
import { MessagesService } from './messages.service'
import { Message } from './models/message.model'
import { TypingIndicatorChanged } from './dto/typing-indicator-changed'

const pubSub = new PubSub()

@UseGuards(GqlAuthGuard)
@Resolver(of => Message)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) {}

  @Query(returns => Message)
  message(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.messagesService.findById(id)
  }

  @Query(returns => [Message])
  messages(@Args() args: GetMessagesArgs) {
    return this.messagesService.find(args)
  }

  @Mutation(returns => Message)
  async createMessage(@CurrentUser() user, @Args('data') message: MessageCreateInput) {
    message.fromUser = user._id

    const messageCreated = await this.messagesService.create(message)
    pubSub.publish('messageCreated', { messageCreated })

    return messageCreated
  }

  @Mutation(returns => Message)
  updateMessage(@Args({ name: 'id', type: () => ID }) id: string, @Args('data') data: MessageUpdateInput) {
    return this.messagesService.updateById(id, data)
  }

  @ResolveField('fromUser', () => User)
  resolveUser(
    @Parent() message: Message,
    @Loader(UsersLoader.name) usersLoader: DataLoader<string, User>
  ): Promise<User> {
    return usersLoader.load(message.fromUser.toString())
  }

  @Subscription(returns => Message, {
    filter: (payload, variables) => {
      return payload.messageCreated.roomId.toString() === variables.roomId
    }
  })
  messageCreated(@Args('roomId') _: string) {
    return pubSub.asyncIterator('messageCreated')
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Boolean)
  async changeTypingIndicator(
    @CurrentUser() user: any,
    @Args({ name: 'roomId', type: () => ID }) roomId: string,
    @Args({ name: 'isTyping', type: () => Boolean }) isTyping: boolean
  ) {
    await pubSub.publish('typingIndicatorChanged', {
      roomId,
      typingIndicatorChanged: {
        user: {
          _id: user._id,
          name: user.fullName
        },
        isTyping
      } as TypingIndicatorChanged
    })

    return true
  }

  @Subscription(returns => TypingIndicatorChanged, {
    filter: (payload, variables) => {
      return payload.roomId?.toString() === variables.roomId?.toString()
    }
  })
  typingIndicatorChanged(@Args({ name: 'roomId', type: () => ID }) _: string) {
    return pubSub.asyncIterator('typingIndicatorChanged')
  }
}
