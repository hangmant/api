import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { ObjectType, Field } from '@nestjs/graphql';

import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CountryDocument = Country & Document;

@Schema({
  timestamps: true,
})
@ObjectType()
export class Country {
  @Field()
  _id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @Prop()
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsUrl()
  @Prop()
  flag?: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @Prop()
  alpha2Code: string;

  @Field((type) => Date)
  readonly createdAt: Date;

  @Field((type) => Date)
  readonly updatedAt: Date;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
