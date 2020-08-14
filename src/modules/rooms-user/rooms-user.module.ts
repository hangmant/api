import { Module } from '@nestjs/common'
import { MongoModule } from '../mongo/mongo.module'
import { RoomUser } from './models/room-user.model'
import { RoomsUserResolver } from './rooms-user.resolver'
import { RoomsUserService } from './rooms-user.service'

@Module({
  imports: [MongoModule.forFeature([RoomUser])],
  providers: [RoomsUserResolver, RoomsUserService]
})
export class RoomsUserModule {}
