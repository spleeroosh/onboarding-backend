import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '@src/users/dto/create-user.dto';
import { UserEntity } from '@src/users/entities/user.entity';
import { UsersService } from '@src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<UserEntity> {
    const user = await this.usersService.findUserByEmail(email);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  async register(dto: CreateUserDto): Promise<UserEntity> {
    const user = await this.usersService.create(dto);

    return user;
  }

  async login({
    email,
    password,
  }: CreateUserDto): Promise<{ access_token: string }> {
    const validUser = await this.validateUser(email, password);
    const payload = { email: validUser.email, sub: validUser.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async generateJwtToken(user: CreateUserDto) {
    return this.jwtService.sign(user, {
      secret: this.configService.get('SECRET_KEY'),
      expiresIn: '24h',
    });
  }
}
