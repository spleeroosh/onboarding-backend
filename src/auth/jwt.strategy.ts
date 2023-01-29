import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { CreateUserDto } from '@src/users/dto/create-user.dto';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExipration: false,
      secretOrKey: configService.get<string>('SECRET_KEY'),
    });
  }

  async validate(user: CreateUserDto): Promise<CreateUserDto> {
    return {
      ...user,
    };
  }
}
