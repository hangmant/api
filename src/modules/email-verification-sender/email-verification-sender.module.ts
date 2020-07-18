import { Module } from '@nestjs/common'
import { EmailVerificationToken } from '../email-verification/models/email-verification-token.model'
import { MongoModule } from '../mongo/mongo.module'
import { EmailVerificationSenderService } from './email-verification-sender.service'

@Module({
  imports: [MongoModule.forFeature([EmailVerificationToken])],
  providers: [EmailVerificationSenderService],
  exports: [EmailVerificationSenderService]
})
export class EmailVerificationSenderModule {}
