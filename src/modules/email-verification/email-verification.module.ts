import { Module } from '@nestjs/common'
import { MongoModule } from '../mongo/mongo.module'
import { UserModule } from '../users/users.module'
import { EmailVerificationResolver } from './email-verification.resolver'
import { EmailVerificationService } from './email-verification.service'
import { EmailVerificationToken } from './models/email-verification-token.model'

@Module({
  imports: [MongoModule.forFeature([EmailVerificationToken]), UserModule],
  providers: [EmailVerificationResolver, EmailVerificationService]
})
export class EmailVerificationModule {}
