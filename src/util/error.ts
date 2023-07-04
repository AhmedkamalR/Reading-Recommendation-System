import { HttpException } from '@nestjs/common';

export class AppError extends HttpException {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
  }
}

export enum ErrorMsg {
  NOT_FOUND = 'Not Found',
  UNAUTHORIZED = 'Not Autorized',
  BAD_REQUEST = 'Bad Request',
}
