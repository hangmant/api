import { UseGuards } from '@nestjs/common'
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from '../../guards/gql-auth.guard'
import { RoomCreateInput } from './dto/room-create.input'
import { RoomUpdateInput } from './dto/room-update.input'
import { Room } from './models/room.model'
import { RoomsService } from './rooms.service'

@Resolver(of => Room)
export class RoomsResolver {
  constructor(private readonly roomsService: RoomsService) {}

  @UseGuards(GqlAuthGuard)
  @Query(returns => Room)
  room(@Args({ name: '_id', type: () => ID }) id: string) {
    return this.roomsService.findById(id)
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => [Room])
  rooms() {
    return []
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Room)
  createRoom(@Args('data') data: RoomCreateInput) {
    return this.roomsService.create(data)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Room)
  updateRoom(@Args({ name: '_id', type: () => ID }) id: string, @Args('data') data: RoomUpdateInput) {
    return this.roomsService.updateById(id, data)
  }
}
