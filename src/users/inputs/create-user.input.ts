import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field()
  email: string;

  @Field({ nullable: true })
  name: string;

  @Field()
  password: string;
}
