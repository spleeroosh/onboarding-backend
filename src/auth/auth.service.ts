import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '@src/users/inputs/create-user.input';
import { UserEntity } from '@src/users/entities/user.entity';
import { UsersService } from '@src/users/users.service';
import { LoginResponseDto } from './inputs/login-response.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<UserEntity> {
    const user = await this.usersService.findUserByEmail(email);

    if (user) {
      const passwordsAreEqual = await bcrypt.compare(pass, user?.password);

      if (passwordsAreEqual) {
        return user;
      }
    }

    throw new HttpException(
      'Invalid email or password',
      HttpStatus.BAD_REQUEST,
    );
  }

  async signup(dto: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.validateUser(dto.email, dto.password);
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const password = await bcrypt.hash(
      dto.password,
      +this.configService.get('SALT'),
    );

    const user = await this.usersService.create({ ...dto, password });
    return user;
  }

  async login({ email, password }: CreateUserDto): Promise<LoginResponseDto> {
    const user = await this.validateUser(email, password);

    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }
}
