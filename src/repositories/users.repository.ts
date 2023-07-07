import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CryptService } from 'src/services/crypt.service';

@Injectable()
export class UserRepository {
  private SALT_SECRET = 14;
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private cryptService: CryptService,
  ) {}

  async getUserByname(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  async getUserById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async createUser(username: string, password: string): Promise<User> {
    const hashedPassword = await this.cryptService.crypt(password);

    return this.userRepository.save({ username, password: hashedPassword });
  }
}
