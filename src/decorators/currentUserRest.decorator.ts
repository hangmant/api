import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { JwtAuthUser } from '../modules/auth/interfaces/jwt-auth-user.interface'

export const CurrentUserRest = createParamDecorator(
  (data: string, ctx: ExecutionContext): JwtAuthUser => {
    const request = ctx.switchToHttp().getRequest()
    const user = request.user

    return data ? user && user[data] : user
  }
)
