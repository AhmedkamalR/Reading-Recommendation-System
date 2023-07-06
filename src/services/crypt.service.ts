import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptService {
  async crypt(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
