import { Injectable } from '@nestjs/common'
import { createHash } from 'crypto'
import { GravatarDefault } from '../enums/gravatar-default.enum'
import { GravatarOptions } from './gravatar.types'

@Injectable()
export class GravatarService {
  private readonly BASE_URL = 'https://secure.gravatar.com/avatar'

  forEmail(email: string, options?: GravatarOptions) {
    options = {
      size: 120,
      default: GravatarDefault.RoboHash,
      ...(options ?? {})
    }
    const hash = this.hashEmail(email)

    return `${this.BASE_URL}/${hash}?default=${options.default}&size=${options.size}`
  }

  private hashEmail(email: string) {
    return createHash('md5').update(email).digest('hex')
  }
}
