import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class UserTypingIndicatorChanged {
  @Field()
  _id: string;

  @Field()
  name: string;
}

@ObjectType()
export class TypingIndicatorChanged {
  @Field((type) => UserTypingIndicatorChanged)
  user: UserTypingIndicatorChanged;

  @Field()
  isTyping: boolean;
}
