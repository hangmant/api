import { Module } from '@nestjs/common'
import { MongoModule } from '../mongo/mongo.module'
import { RoomsModule } from '../rooms/rooms.module'
import { UserModule } from '../users/users.module'
import { RoomUser } from './models/room-user.model'
import { RoomsUserResolver } from './rooms-user.resolver'
import { RoomsUserService } from './services/rooms-user.service'

@Module({
  imports: [MongoModule.forFeature([RoomUser]), UserModule, RoomsModule],
  providers: [RoomsUserResolver, RoomsUserService]
})
export class RoomsUserModule {}
