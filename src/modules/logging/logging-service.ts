import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import { LoggingMyService } from './logging-my.service';

@Injectable()
export class LoggingService implements NestMiddleware {
  // private logger = new Logger('HTTP');
  private logger: LoggingMyService;

  constructor(private config: ConfigService) {
    this.logger = new LoggingMyService(this.config);
    this.logger.setContext(LoggingService.name);
  }

  // use(req: any, res: any, next: () => void) {
  use(request: Request, response: Response, next: NextFunction): void {
    // const { ip, method, originalUrl, body } = request;
    const { method, originalUrl, body, params } = request;
    // const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      // const contentLength = response.get('content-length');
      // this.logger.log()

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${JSON.stringify(
          body,
        )} ${JSON.stringify(params)}`,
      );
    });
    // ${contentLength} - ${userAgent} ${ip}
    next();
  }
}
// import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
//
// @Injectable()
// export class LoggingService implements NestMiddleware {
//   private logger = new Logger('HTTP');
//
//   use(request: Request, response: Response, next: NextFunction): void {
//     const { ip, method, originalUrl } = request;
//     const userAgent = request.get('user-agent') || '';
//
//     response.on('finish', () => {
//       const { statusCode } = response;
//       const contentLength = response.get('content-length');
//
//       this.logger.log(
//         `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
//       );
//     });
//
//     next();
//   }
// }
