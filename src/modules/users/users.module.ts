import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { BcryptModule } from '../bcrypt/bcrypt.module'
import { EmailVerificationSenderModule } from '../email-verification-sender/email-verification-sender.module'
import { User, UserSchema } from './models/user.model'
import { UserController } from './users.controller'
import { UsersLoader } from './users.loader'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
  imports: [ 
   BcryptModule, 
   EmailVerificationSenderModule,
  MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [UserController],
  providers: [UsersResolver, UsersLoader, UsersService],
  exports: [UsersService, UsersLoader]
})
export class UserModule {}
