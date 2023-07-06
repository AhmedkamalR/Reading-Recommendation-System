import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  private SALT_SECRET = 14;
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  //   async createUser(name: string): Promise<User> {
  //     const user = new User();
  //     user.user = name;
  //     return this.userRepository.save(user);
  //   }
  async getUserByname(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  async getUserById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async createUser(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.userRepository.save({ username, password: hashedPassword });
  }
}
