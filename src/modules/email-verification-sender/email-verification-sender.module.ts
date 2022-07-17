import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { EmailVerificationToken, EmailVerificationTokenSchema } from '../email-verification/models/email-verification-token.model'
import { EmailVerificationSenderService } from './email-verification-sender.service'

@Module({
  imports: [    MongooseModule.forFeature([{ name: EmailVerificationToken.name, schema: EmailVerificationTokenSchema }]),
],
  providers: [EmailVerificationSenderService],
  exports: [EmailVerificationSenderService]
})
export class EmailVerificationSenderModule {}
