import { Module } from '@nestjs/common'
import { MongoModule } from '../mongo/mongo.module'
import { Room } from './models/room.model'
import { RoomsResolver } from './rooms.resolver'
import { RoomsService } from './rooms.service'

@Module({
  imports: [MongoModule.forFeature([Room])],
  providers: [RoomsResolver, RoomsService],
  exports: [RoomsService]
})
export class RoomsModule {}
