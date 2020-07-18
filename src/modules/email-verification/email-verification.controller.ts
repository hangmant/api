import { Controller, Param, Patch } from '@nestjs/common'
import { EmailVerificationService } from './email-verification.service'

@Controller('email-verification')
export class EmailVerificationController {
  constructor(private readonly emailVerificationService: EmailVerificationService) {}

  @Patch(':token')
  verify(@Param('token') token: string) {
    return this.emailVerificationService.verifyByToken(token)
  }
}
