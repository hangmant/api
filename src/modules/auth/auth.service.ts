import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { from, Observable, of, throwError } from 'rxjs'
import { concatMap } from 'rxjs/operators'
import { BcryptService } from '../bcrypt/bcrypt.service'
import { UsersService } from '../users/users.service'
import { LoginLocalDto } from './dtos/login-local.dto'
import { ResLoginLocal } from './dtos/res-login-local.dto'
import { JwtPayload } from './interfaces/jwt-payload.interface'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly bcryptService: BcryptService
  ) {}

  login({ username, password }: LoginLocalDto): Observable<ResLoginLocal> {
    return this.usersService.findByEmail(username).pipe(
      concatMap(user => {
        if (!user) {
          return throwError(new UnauthorizedException(`${username} doesn't exists`))
        }
        return this.bcryptService.comparePassword(password, user.password).pipe(
          concatMap(isAuthorized => {
            if (!isAuthorized) {
              return throwError(new UnauthorizedException('username or email are incorrect'))
            }

            const payload: JwtPayload = {
              // TODO: Solve type.
              sub: (user as any)._id,
              fullName: user.name,
              email: user.email
            }

            return from(this.jwtService.signAsync(payload)).pipe(
              concatMap(token => {
                return of({
                  token
                })
              })
            )
          })
        )
      })
    )
  }
}
