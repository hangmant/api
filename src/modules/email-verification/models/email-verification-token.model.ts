import { prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export class EmailVerificationToken extends TimeStamps {
  @prop({ required: true, index: true })
  userId: string

  @prop({ required: true, index: true })
  token: string
}
