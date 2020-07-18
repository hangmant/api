import { Module } from '@nestjs/common'
import { BcryptModule } from '../bcrypt/bcrypt.module'
import { EmailVerificationSenderModule } from '../email-verification-sender/email-verification-sender.module'
import { MongoModule } from '../mongo/mongo.module'
import { UserController } from './users.controller'
import { User } from './users.model'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
  imports: [MongoModule.forFeature([User]), BcryptModule, EmailVerificationSenderModule],
  controllers: [UserController],
  providers: [UsersResolver, UsersService],
  exports: [UsersService]
})
export class UserModule {}
