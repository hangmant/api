import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmailVerificationTokenDocument = EmailVerificationToken & Document;

@Schema({
  timestamps: true,
})
export class EmailVerificationToken {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, index: true, unique: true })
  token: string;

  readonly createdAt: Date;

  readonly updatedAt: Date;
}

export const EmailVerificationTokenSchema = SchemaFactory.createForClass(
  EmailVerificationToken,
);
