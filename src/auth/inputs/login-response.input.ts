import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '@src/users/entities/user.entity';

@ObjectType()
export class LoginResponseDto {
  @Field()
  accessToken: string;

  @Field(() => UserEntity)
  user: UserEntity;
}
