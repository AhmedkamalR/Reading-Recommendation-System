import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/users.repository';
import { User } from '../entities/user.entity';
import { AppError } from 'src/util/error';
import { ResponseCode } from 'src/util/response';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async signIn(username: string, password: string): Promise<User> {
    const user = this.userRepository.getUserByname(username);
    if (!user) {
      throw new AppError('User not Found', ResponseCode.NOT_FOUND);
    }

    return user;
  }

  async signUp(username: string, password: string): Promise<User> {
    const user = await this.userRepository.getUserByname(username);
    if (user) {
      return user;
    }

    return this.userRepository.createUser(username, password);
  }

  async getUserById(id: number): Promise<User> {
    return this.userRepository.getUserById(id);
  }
}
