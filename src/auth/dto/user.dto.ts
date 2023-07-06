import { User } from '../../entities/user.entity';

export class UserResponseDto {
  public username: string;
  public role: string;
  public id: number;

  constructor(user: User) {
    this.username = user.username;
    this.role = user.role;
    this.id = user.id;
  }
}

export class UserRequestDto {
  public username: string;
  public password: string;
}
