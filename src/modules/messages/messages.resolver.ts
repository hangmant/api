import { NotFoundException, UseGuards } from '@nestjs/common'
import { Args, ID, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'apollo-server-fastify'
import { of, throwError } from 'rxjs'
import { concatMap } from 'rxjs/operators'
import { CurrentUser } from '../../decorators/currentUser.decorator'
import { GqlAuthGuard } from '../../guards/gqlAuth.guard'
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

  @Mutation(returns => Message)
  createMessage(@CurrentUser() user, @Args('data') message: MessageCreateInput) {
    message.fromUser = user._id

    pubSub.publish('messageCreated', {
      text: message.text,
      roomId: message.roomId,
      fromUser: user._id
    })
    return this.messagesService.create(message)
  }

  @Subscription(returns => Message)
  messageCreated() {
    return pubSub.asyncIterator('messageCreated')
  }

  @Mutation(returns => Message)
  updateMessage(@Args({ name: '_id', type: () => ID }) id: string, @Args('data') data: MessageUpdateInput) {
    return this.messagesService.updateById(id, data)
  }
}
