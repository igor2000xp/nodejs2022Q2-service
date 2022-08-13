import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import { MyLoggingService } from './my-logging.service';

@Injectable()
export class LoggingServiceMiddleware implements NestMiddleware {
  private logger: MyLoggingService;

  constructor(private config: ConfigService) {
    this.logger = new MyLoggingService(this.config);
    this.logger.setContext(LoggingServiceMiddleware.name);
  }
  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl, body, params } = request;

    response.on('finish', () => {
      const { statusCode } = response;

      if (+statusCode > 199 && +statusCode < 300) {
        this.logger.log(
          `${method} ${originalUrl} ${statusCode} ${JSON.stringify(
            body,
          )} ${JSON.stringify(params)}`,
          LoggingServiceMiddleware.name,
        );
      } else if (+statusCode > 399 && +statusCode < 501) {
        this.logger.error(
          `${method} ${originalUrl} ${statusCode} ${JSON.stringify(
            body,
          )} ${JSON.stringify(params)}`,
          LoggingServiceMiddleware.name,
        );
      }
    });
    next();
  }
}
