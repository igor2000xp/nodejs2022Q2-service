import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  // logger: Logger;

  constructor() {
    // this.logger = new Logger();
  }

  getHello(): string {
    // this.logger.log('test');
    // this.logger.debug('test2');
    // this.logger.error('test3');
    return 'Hello World!';
  }
}
