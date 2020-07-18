import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { EmailVerificationReqDto } from './dto/email-verification-req.dto'
import { EmailVerificationService } from './email-verification.service'

@Resolver('EmailVerification')
export class EmailVerificationResolver {
  constructor(private readonly emailVerificationService: EmailVerificationService) {}

  @Mutation()
  verifyEmail(@Args('data') data: EmailVerificationReqDto) {
    return this.emailVerificationService.verifyByToken(data.token)
  }
}
