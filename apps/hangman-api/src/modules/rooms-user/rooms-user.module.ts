import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsModule } from '../rooms/rooms.module';
import { UserModule } from '../users/users.module';
import { RoomUser, RoomUserSchema } from './models/room-user.model';
import { RoomsUserResolver } from './rooms-user.resolver';
import { RoomsUserService } from './services/rooms-user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RoomUser.name, schema: RoomUserSchema },
    ]),
    UserModule,
    RoomsModule,
  ],
  providers: [RoomsUserResolver, RoomsUserService],
})
export class RoomsUserModule {}
