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

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${JSON.stringify(
          body,
        )} ${JSON.stringify(params)}`,
      );
    });
    next();
  }
}
