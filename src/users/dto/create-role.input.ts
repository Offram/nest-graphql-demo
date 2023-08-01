import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateRoleInput {
  @Field(() => Int)
  id: number;

  @Field()
  rolename: string;
}
