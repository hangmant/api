import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from '../users/users.module'
import { EmailVerificationController } from './email-verification.controller'
import { EmailVerificationResolver } from './email-verification.resolver'
import { EmailVerificationService } from './email-verification.service'
import { EmailVerificationToken, EmailVerificationTokenSchema } from './models/email-verification-token.model'

@Module({
  imports: [
   UserModule,  MongooseModule.forFeature([{ name: EmailVerificationToken.name, schema: EmailVerificationTokenSchema }])],
  controllers: [EmailVerificationController],
  providers: [EmailVerificationResolver, EmailVerificationService]
})
export class EmailVerificationModule {}
