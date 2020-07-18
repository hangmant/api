import { Module } from '@nestjs/common'
import { MongoModule } from '../mongo/mongo.module'
import { EmailVerificationToken } from './models/email-verification-token.model'
import { UserModule } from '../users/users.module'
import { EmailVerificationController } from './email-verification.controller'
import { EmailVerificationService } from './email-verification.service'

@Module({
  imports: [MongoModule.forFeature([EmailVerificationToken]), UserModule],
  controllers: [EmailVerificationController],
  providers: [EmailVerificationService]
})
export class EmailVerificationModule {}
