import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/users.repository';
import { User } from '../entities/user.entity';
import { AppError } from 'src/util/error';
import { ResponseCode } from 'src/util/response';
import * as bcrypt from 'bcrypt';
import { UserRequestDto, UserResponseDto } from 'src/auth/dto/user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async signIn({
    username,
    password,
  }: UserRequestDto): Promise<UserResponseDto> {
    const user = await this.userRepository.getUserByname(username);
    if (!user) {
      throw new AppError('User not Found', ResponseCode.NOT_FOUND);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError('Invalid password', ResponseCode.BAD_REQUEST);
    }

    return new UserResponseDto(user);
  }

  async signUp(username: string, password: string): Promise<UserResponseDto> {
    const user = await this.userRepository.getUserByname(username);
    if (user) {
      return new UserResponseDto(user);
    }

    const newUser = await this.userRepository.createUser(username, password);
    return new UserResponseDto(newUser);
  }

  async getUserById(id: number): Promise<User> {
    return this.userRepository.getUserById(id);
  }
}
