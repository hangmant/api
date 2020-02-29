import * as dotenv from 'dotenv'

dotenv.config()

const env = process.env

export const config = {
  env: env.NODE_ENV || 'dev',
  jwt: {
    secret: env.JWT_SECRET || 'secret',
    expiresIn: '1d'
  },
  googleAuth: {
    clientID: env.GOOGLE_CLIENT_ID || 'clientId',
    clientSecret: env.GOOGLE_CLIENT_SECRET || 'secregoogle'
  },
  mongoDBUrl: env.MONGO_DB_URL || 'mongodb://localhost/severly',
  port: parseInt(env.PORT, 10) || 8087,
  host: env.HOST
}
