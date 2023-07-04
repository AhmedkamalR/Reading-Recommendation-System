import { Controller, Get } from '@nestjs/common';
import { UserService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  async getAllUsers(): Promise<any> {
    return this.usersService.getUserById(1);
  }
}
