import { Args, Query, Mutation, Resolver, ID } from '@nestjs/graphql';

import { UserEntity } from 'src/users/entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../users.service';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserEntity)
  async createUser(
    @Args('createUserDto') createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    return await this.usersService.create(createUserDto);
  }

  @Query(() => [UserEntity])
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.usersService.getAllUsers();
  }
}
