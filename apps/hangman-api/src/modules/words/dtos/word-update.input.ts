import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class WordUpdateInput {
  @Field()
  name: string;
}
