import { IsEmail, IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator'
import { Country } from '../../countries/models/country.model'
import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document;

@Schema({
  timestamps: true
})
@ObjectType()
export class User {
  @Field(type => ID)
  _id: string

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @Prop({ maxlength: 20 })
  username?: string

  @Field()
  @IsString()
  @IsNotEmpty()
  @Prop({ required: true, maxlength: 30 })
  firstName: string

  @Field()
  @IsString()
  @IsNotEmpty()
  @Prop({ required: true, maxlength: 50 })
  lastName: string

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @Prop({ maxlength: 24 })
  phone?: string

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @Prop()
  address?: string

  @Field(type => Country, { nullable: true })
  @IsOptional()
  @Prop()
  country?: Country

  @Field()
  @IsEmail()
  @IsNotEmpty()
  @Prop({ required: true, maxlength: 60 })
  email: string

  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  @Field({ nullable: true })
  @Prop()
  isEmailVerified?: boolean

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @Prop()
  avatar?: string

  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  password: string

  @Field(type => Date)
  createdAt: Date

  @Field(type => Date)
  updatedAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User);