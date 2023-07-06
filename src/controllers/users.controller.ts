import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../services/users.service';
import { UserRequestDto } from '../dto/user.dto';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Post('signin')
  async signIn(@Body() userRequestDto: UserRequestDto) {
    return this.usersService.signIn(userRequestDto);
  }

  @Post('signup')
  async signUp(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.usersService.signUp(username, password);
  }
}
