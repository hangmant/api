import { Module } from '@nestjs/common'
import { BcryptModule } from '../bcrypt/bcrypt.module'
import { EmailVerificationSenderModule } from '../email-verification-sender/email-verification-sender.module'
import { MongoModule } from '../mongo/mongo.module'
import { User } from './models/user.model'
import { UserController } from './users.controller'
import { UsersLoader } from './users.loader'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
  imports: [MongoModule.forFeature([User]), BcryptModule, EmailVerificationSenderModule],
  controllers: [UserController],
  providers: [UsersResolver, UsersLoader, UsersService],
  exports: [UsersService, UsersLoader]
})
export class UserModule {}
