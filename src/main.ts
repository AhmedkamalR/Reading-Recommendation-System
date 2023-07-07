import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingService } from '../src/services/logging.service';
import { GlobalExceptionFilter } from './filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggingService = app.get(LoggingService);

  app.useGlobalFilters(new GlobalExceptionFilter(loggingService));
  await app.listen(3000);
}
bootstrap();
