import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';

@Injectable()
export class CryptService {
  constructor(private jwtService: JwtService) {}

  async crypt(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async generateAuthToken(user: User): Promise<string> {
    const payload = { sub: user.id, ...user };
    const token = await this.jwtService.signAsync(payload);

    return token;
  }
}
