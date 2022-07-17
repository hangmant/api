import { NotFoundException, UseGuards } from '@nestjs/common'
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { of, throwError } from 'rxjs'
import { concatMap } from 'rxjs/operators'
import { CurrentUser } from '../../decorators/currentUser.decorator'
import { GqlAuthGuard } from '../../guards/gql-auth.guard'
import { Room } from '../rooms/models/room.model'
import { User } from '../users/models/user.model'
import { RoomUserCreateInput } from './dto/room-user-create.input'
import { RoomUser } from './models/room-user.model'
import { RoomsUserService } from './services/rooms-user.service'

@Resolver(of => RoomUser)
export class RoomsUserResolver {
  constructor(private readonly roomsUserService: RoomsUserService) {}

  @UseGuards(GqlAuthGuard)
  @Query(returns => RoomUser)
  userRoom(@Args({ name: '_id', type: () => ID }) id: string) {
    return this.roomsUserService.findById(id).pipe(
      concatMap(value => {
        if (!value) return throwError(new NotFoundException('Room not found'))
        return of(value)
      })
    )
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => RoomUser)
  createRoomUser(@CurrentUser() user, @Args('data') data: RoomUserCreateInput) {
    if (!data.userId) {
      data.userId = user._id
    }
    return this.roomsUserService.create(data)
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => [User])
  async roomUsers(@Args({ name: 'roomId', type: () => ID }) roomId: string) {
    return this.roomsUserService.findRoomUsers(roomId)
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => [Room])
  async userRooms(@CurrentUser() user) {
    return this.roomsUserService.findRoomsForUser(user._id)
  }
}
