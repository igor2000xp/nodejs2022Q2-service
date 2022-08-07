import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import { LoggingMyService } from './logging-my.service';

@Injectable()
export class LoggingService implements NestMiddleware {
  private logger: LoggingMyService;

  constructor(private config: ConfigService) {
    this.logger = new LoggingMyService(this.config);
    this.logger.setContext(LoggingService.name);
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
