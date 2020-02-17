import { Injectable } from '@nestjs/common'
import { OAuth2Strategy } from 'passport-google-oauth'

import * as passport from 'passport'
import { config } from '../../../config'

@Injectable()
export class GoogleStrategy extends OAuth2Strategy {
  constructor() {
    super(
      {
        clientID: config.googleAuth.clientID,
        clientSecret: config.googleAuth.clientSecret,
        callbackURL: '/auth/google/callback',
        passReqToCallback: true
      },
      async (req, accesToken, refreshToken, profileData, done) => {
        try {
          const profile = profileData._json

          return done(null, profile)
        } catch (error) {
          console.error(error)
          return done(error)
        }
      }
    )

    passport.use(this)

    passport.serializeUser((user, done) => {
      done(null, user)
    })

    passport.deserializeUser((user, done) => {
      done(null, user)
    })
  }
}
