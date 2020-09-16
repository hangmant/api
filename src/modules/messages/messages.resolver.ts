import { NotFoundException, UseGuards } from '@nestjs/common'
import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'apollo-server-fastify'
import * as DataLoader from 'dataloader'
import { Loader } from 'nestjs-dataloader-dan'
import { from, Observable, of, throwError } from 'rxjs'
import { concatMap, tap } from 'rxjs/operators'
import { CurrentUser } from '../../decorators/currentUser.decorator'
import { GqlAuthGuard } from '../../guards/gqlAuth.guard'
import { User } from '../users/models/user.model'
import { UsersLoader } from '../users/users.loader'
import { GetMessagesArgs } from './dto/get-messages.args'
import { MessageCreateInput } from './dto/message-create.input'
import { MessageUpdateInput } from './dto/message-update.input'
import { MessagesService } from './messages.service'
import { Message } from './models/message.model'

const pubSub = new PubSub()

@UseGuards(GqlAuthGuard)
@Resolver(of => Message)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) {}

  @Query(returns => Message)
  message(@Args({ name: '_id', type: () => ID }) id: string) {
    return this.messagesService.findById(id).pipe(
      concatMap(value => {
        if (!value) return throwError(new NotFoundException('Room not found'))
        return of(value)
      })
    )
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
  resolveCategory(
    @Parent() message: Message,
    @Loader(UsersLoader.name) usersLoader: DataLoader<string, User>
  ): Observable<User | null> {
    return from(usersLoader.load(message.fromUser.toString()))
  }

  @Subscription(returns => Message, {
    filter: (payload, variables) => {
      return payload.messageCreated.roomId.toString() === variables.roomId
    }
  })
  messageCreated(@Args('roomId') roomId: string) {
    return pubSub.asyncIterator('messageCreated')
  }
}
