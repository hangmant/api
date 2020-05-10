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
  mongoDBUrl: env.MONGO_DB_URL || 'mongodb://localhost/hangman-api',
  port: parseInt(env.PORT, 10) || 8087,
  host: env.HOST,
  aws: {
    s3: {
      hangmanBucket: {
        name: env.AWS_S3_BUCKET_NAME,
        expires: 60
      },
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAcessKey: env.AWS_SECRET_ACCESS_KEY
    }
  }
}
