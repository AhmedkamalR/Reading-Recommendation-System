import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from '../services/users.service';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Post('login')
  async signIn(@Body() username: string, @Body() password: string) {
    return this.usersService.signIn(username, password);
  }

  @Post('signup')
  async signUp(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.usersService.signUp(username, password);
  }

  @Get()
  async getAllUsers(): Promise<any> {
    return this.usersService.getUserById(1);
  }
}
