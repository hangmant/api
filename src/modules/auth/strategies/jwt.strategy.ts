import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { config } from '../../../config'
import { JwtPayload } from '../interfaces/jwt-payload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwt.secret
    })
  }

  validate(payload: JwtPayload) {
    const userInfo = {
      _id: payload.sub,
      fullName: payload.fullName,
      email: payload.email,
      isAuthenticated: true
    }

    return userInfo
  }
}
