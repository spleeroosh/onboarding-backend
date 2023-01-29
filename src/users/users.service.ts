import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './inputs/create-user.input';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const user = await this.usersRepository.save({ ...dto });

    return user;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    const users = await this.usersRepository.find();
    return users;
  }
}
