import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MessageUpdateInput {
  @Field({
    description: 'body of message in text plain or markdown ',
    nullable: true,
  })
  text?: string;
}
