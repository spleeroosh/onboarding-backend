import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from '@src/users/inputs/create-user.input';
import { UserEntity } from '@src/users/entities/user.entity';

import { AuthService } from './auth.service';
import { LoginResponseDto } from './inputs/login-response.input';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponseDto)
  async login(
    @Args('createUserDto') createUserDto: CreateUserDto,
  ): Promise<LoginResponseDto> {
    return await this.authService.login(createUserDto);
  }

  @Mutation(() => UserEntity)
  async signup(
    @Args('createUserDto') createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    return await this.authService.signup(createUserDto);
  }
}
