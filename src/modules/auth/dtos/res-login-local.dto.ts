import { ApiProperty } from '@nestjs/swagger'
import { TOKEN_EXAMPLE } from '../auth.constants'

export class ResLoginLocal {
  @ApiProperty({
    description: 'JWT for authentication',
    example: TOKEN_EXAMPLE
  })
  token: string
}
