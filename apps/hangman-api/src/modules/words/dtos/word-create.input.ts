import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class WordCreateInput {
  @Field()
  name: string;

  @Field()
  categoryId: string;
}
