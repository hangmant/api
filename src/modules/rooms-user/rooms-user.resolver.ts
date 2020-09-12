import { NotFoundException } from '@nestjs/common'
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { of, throwError } from 'rxjs'
import { concatMap } from 'rxjs/operators'
import { User } from '../users/models/user.model'
import { RoomUserCreateInput } from './dto/room-user-create.input'
import { RoomUser } from './models/room-user.model'
import { RoomsUserService } from './services/rooms-user.service'
import { Room } from '../rooms/models/room.model'

@Resolver(of => RoomUser)
export class RoomsUserResolver {
  constructor(private readonly roomsUserService: RoomsUserService) {}

  @Query(returns => RoomUser)
  userRoom(@Args({ name: '_id', type: () => ID }) id: string) {
    return this.roomsUserService.findById(id).pipe(
      concatMap(value => {
        if (!value) return throwError(new NotFoundException('Room not found'))
        return of(value)
      })
    )
  }

  @Mutation(returns => RoomUser)
  createRoomUser(@Args('data') category: RoomUserCreateInput) {
    return this.roomsUserService.create(category)
  }

  @Query(returns => [User])
  async roomUsers(@Args({ name: 'roomId', type: () => ID }) roomId: string) {
    return this.roomsUserService.findRoomUsers(roomId)
  }

  @Query(returns => [Room])
  async userRooms(@Args({ name: 'userId', type: () => ID }) userId: string) {
    return this.roomsUserService.findRoomsForUser(userId)
  }
}
