import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from '../auth.service'
import { concatMap } from 'rxjs/operators'
import { throwError, of } from 'rxjs'
import { UnauthorizedException, Injectable } from '@nestjs/common'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super()
  }

  async validate(username: string, password: string) {
    return await this.authService
      .verifyData(username, password)
      .pipe(
        concatMap(user => {
          if (!user) {
            throwError(new UnauthorizedException())
          }
          return of(user)
        })
      )
      .toPromise()
  }
}
