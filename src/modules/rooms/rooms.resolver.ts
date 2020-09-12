import { NotFoundException } from '@nestjs/common'
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { of, throwError } from 'rxjs'
import { concatMap } from 'rxjs/operators'
import { RoomCreateInput } from './dto/room-create.input'
import { RoomUpdateInput } from './dto/room-update.input'
import { Room } from './models/room.model'
import { RoomsService } from './rooms.service'

@Resolver(of => Room)
export class RoomsResolver {
  constructor(private readonly roomsService: RoomsService) {}

  @Query(returns => Room)
  room(@Args({ name: '_id', type: () => ID }) id: string) {
    return this.roomsService.findById(id).pipe(
      concatMap(value => {
        if (!value) return throwError(new NotFoundException('Room not found'))
        return of(value)
      })
    )
  }

  @Query(returns => [Room])
  rooms() {
    return this.roomsService
  }

  @Mutation(returns => Room)
  createRoom(@Args('data') data: RoomCreateInput) {
    return this.roomsService.create(data)
  }

  @Mutation(returns => Room)
  updateRoom(@Args({ name: '_id', type: () => ID }) id: string, @Args('data') data: RoomUpdateInput) {
    return this.roomsService.updateById(id, data)
  }
}
