import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { EmailVerificationInput } from './dto/email-verification.input';
import { EmailVerifyResponse } from './dto/email-verify-response.type';
import { EmailVerificationService } from './email-verification.service';

@Resolver()
export class EmailVerificationResolver {
  constructor(
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  @Mutation((returns) => EmailVerifyResponse)
  verifyEmail(@Args('data') data: EmailVerificationInput) {
    return this.emailVerificationService.verifyByToken(data.token);
  }
}
