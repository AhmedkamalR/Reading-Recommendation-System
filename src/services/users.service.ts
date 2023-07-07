import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/users.repository';
import { User } from '../entities/user.entity';
import { AppError } from '../util/error';
import { ResponseCode } from '../util/response';
import * as bcrypt from 'bcrypt';
import { UserRequestDto, UserResponseDto, SignupResponseDto } from '../dto/user.dto';
import { CryptService } from './crypt.service';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private cryptService: CryptService,
  ) {}

  async signIn({
    username,
    password,
  }: UserRequestDto): Promise<UserResponseDto> {
    const user = await this.userRepository.getUserByname(username);
    if (!user) {
      throw new AppError('User not Found', ResponseCode.NOT_FOUND);
    }
    if(!password){
      throw new AppError('password not Found', ResponseCode.BAD_REQUEST);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError('Invalid password', ResponseCode.BAD_REQUEST);
    }
    const token = await this.cryptService.generateAuthToken(user);
    return new UserResponseDto(user, token);
  }

  async signUp(username: string, password: string): Promise<SignupResponseDto> {
    const user = await this.userRepository.getUserByname(username);
    if (user) {
      throw new AppError('User Already Exists', ResponseCode.BAD_REQUEST);
    }

    if(!password){
      throw new AppError('password not Found', ResponseCode.BAD_REQUEST);
    }
    
    const newUser = await this.userRepository.createUser(username, password);
    return new SignupResponseDto(newUser);
  }

  async getUserById(id: number): Promise<User> {
    return this.userRepository.getUserById(id);
  }
}
