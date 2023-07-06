import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggingService {
  private logger: Logger;

  constructor() {
    this.logger = new Logger();
  }

  log(message: string) {
    this.logger.log(message);
  }

  error(message: string, trace?: string) {
    this.logger.error(message, trace);
  }

  warn(message: string) {
    this.logger.warn(message);
  }
}
