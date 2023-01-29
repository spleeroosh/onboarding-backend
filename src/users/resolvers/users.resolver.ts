import { UseGuards } from '@nestjs/common';
import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '@src/auth/jwt-auth.guard';

import { UserEntity } from '@src/users/entities/user.entity';
import { CreateUserDto } from '../inputs/create-user.input';
import { UsersService } from '../users.service';

@Resolver('User')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => UserEntity)
  async createUser(
    @Args('createUserDto') createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    return await this.usersService.create(createUserDto);
  }

  @Query(() => [UserEntity])
  @UseGuards(JwtAuthGuard)
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.usersService.getAllUsers();
  }
}
