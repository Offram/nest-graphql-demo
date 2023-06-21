import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MutationResponseOutput {
  @Field(() => Int)
  affected?: number;
}
