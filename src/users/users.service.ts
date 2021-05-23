import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) { }

  public async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.createUser(createUserDto);
    if (!user) {
      throw new HttpException('User do not Created', HttpStatus.NO_CONTENT);
    }
    return user;
  }

  public async findAll(queryActive?: string) {
    if (queryActive !== undefined) {
      const active = JSON.parse(queryActive) as boolean;
      const condition: FindConditions<User> = { active };
      return await this.usersRepository.find(condition);
    }
    return await this.usersRepository.find();
  }

  public async findOne(id: string) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new HttpException(`User Not Found with this ID: ${id}`, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  public async update(id: string, updateUserDto: UpdateUserDto) {
    const response = await this.usersRepository.update(id, updateUserDto);
    if (response.affected > 0) {
      return true;
    }
    throw new HttpException(`User Not Updated with this ID: ${id}`, HttpStatus.NOT_FOUND);
  }

  public async remove(id: string) {
    const response = await this.usersRepository.delete(id);
    if (response.affected > 0) {
      return true;
    }
    throw new HttpException(`User Not Deleted with this ID: ${id}`, HttpStatus.NOT_FOUND);
  }
}
