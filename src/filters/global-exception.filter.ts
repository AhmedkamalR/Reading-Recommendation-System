import { Catch, ExceptionFilter, HttpException, ArgumentsHost, NotFoundException, BadRequestException, UnauthorizedException, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { LoggingService } from '../services/logging.service';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggingService: LoggingService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const errorResponse = {
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
    };

    // Customize the error response based on the exception
    if (exception instanceof NotFoundException) {
      errorResponse.message = 'Resource not found';
    } else if (exception instanceof BadRequestException) {
      errorResponse.message = 'Invalid request';
    } else if (exception instanceof UnauthorizedException) {
      errorResponse.message = 'Unauthorized';
    } else if (exception instanceof ForbiddenException) {
      errorResponse.message = 'Forbidden';
    } else if (exception instanceof InternalServerErrorException) {
      errorResponse.message = 'Internal server error';
    }

    // Handle the exception and log it using the logging service
    this.loggingService.error(errorResponse.message, exception.stack);
    
    // Send the customized error response to the client
    response.status(status).json(errorResponse);
  }
}
