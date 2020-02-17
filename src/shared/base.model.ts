import { Expose } from 'class-transformer'
import { SchemaOptions } from 'mongoose'
import { prop, Typegoose } from 'typegoose'

export class BaseModelVm {
  @Expose()
  createdAt?: Date

  @Expose()
  updateAt?: Date

  @Expose()
  id?: string
}

export abstract class BaseModel<T> extends Typegoose {
  @prop()
  @Expose()
  createdAt: Date

  @prop()
  @Expose()
  updatedAt: Date

  @Expose()
  id: string
}

export const schemaOptions: SchemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true
  }
}
