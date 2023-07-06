import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/users.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  // async createUser(name: string): Promise<User> {
  //   return this.userRepository.createUser(name);
  // }

  async getUserById(id: number): Promise<User> {
    return this.userRepository.getUserById(id);
  }
}