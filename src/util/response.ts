export class AppResponse {
  statusCode: number;
  data: any;
  constructor(statusCode: number, data: any) {
    this.statusCode = statusCode;
    this.data = data;
  }
}

export enum ResponseCode {
  SUCCESS = 200,
  NOT_FOUND = 404,
  BAD_REQUEST = 403,
  UNAUTHORIZED = 401,
}
