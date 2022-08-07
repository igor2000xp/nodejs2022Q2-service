import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingService implements NestMiddleware {
  private logger = new Logger('HTTP');

  // use(req: any, res: any, next: () => void) {
  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl, body } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.debug(
        `${method} ${originalUrl} ${statusCode} ${JSON.stringify(body)}`,
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
