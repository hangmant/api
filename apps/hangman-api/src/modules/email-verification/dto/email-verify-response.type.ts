import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EmailVerifyResponse {
  @Field()
  message: string;
}
