import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
// import { MyLoggingService } from '../my-logging.service';

@Catch()
export class CustomExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };
    console.error(
      `[${CustomExceptionsFilter.name} - Status ${responseBody.statusCode}] = That message from Custom exception filter:`,
    );
    // this.logger.error(`From Custom filter: ${httpStatus} = ${ctx.getResponse()} = ${responseBody}`)
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
