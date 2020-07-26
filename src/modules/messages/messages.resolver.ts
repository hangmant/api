import { NotFoundException } from '@nestjs/common'
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { of, throwError } from 'rxjs'
import { concatMap } from 'rxjs/operators'
import { MessageCreateInput } from './dto/message-create.input'
import { MessageUpdateInput } from './dto/message-update.input'
import { MessagesService } from './messages.service'
import { Message } from './models/message.model'

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
  createMessage(@Args('data') message: MessageCreateInput) {
    return this.messagesService.create(message)
  }

  @Mutation(returns => Message)
  updateMessage(@Args({ name: '_id', type: () => ID }) id: string, @Args('data') data: MessageUpdateInput) {
    return this.messagesService.updateById(id, data)
  }
}
