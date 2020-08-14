import { NotFoundException } from '@nestjs/common'
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { of, throwError } from 'rxjs'
import { concatMap } from 'rxjs/operators'
import { RoomCreateInput } from './dto/room-create.input'
import { RoomUser } from './models/room-user.model'
import { RoomsUserService } from './rooms-user.service'

@Resolver(of => RoomUser)
export class RoomsUserResolver {
  constructor(private readonly roomsUserService: RoomsUserService) {}

  @Query(returns => RoomUser)
  room(@Args({ name: '_id', type: () => ID }) id: string) {
    return this.roomsUserService.findById(id).pipe(
      concatMap(value => {
        if (!value) return throwError(new NotFoundException('Room not found'))
        return of(value)
      })
    )
  }

  @Mutation(returns => RoomUser)
  createRoom(@Args('data') category: RoomCreateInput) {
    return this.roomsUserService.create(category)
  }
}
