// import { Injectable } from '@nestjs/common';
//
// @Injectable()
// export class LoggingMyService {}

import { ConsoleLogger, LoggerService } from '@nestjs/common';

export class LoggingMyService extends ConsoleLogger {
  // error(message: any, stack?: string, context?: string) {
  //   // add your tailored logic here
  //   // super.error(...arguments);
  //   super.error('error');
  // }

  // /**
  //  * Write a 'log' level log.
  //  */
  // log(message: any, ...optionalParams: any[]) {}
  //
  // /**
  //  * Write an 'error' level log.
  //  */
  // error(message: any, ...optionalParams: any[]) {}
  //
  // /**
  //  * Write a 'warn' level log.
  //  */
  // warn(message: any, ...optionalParams: any[]) {}
  //
  // /**
  //  * Write a 'debug' level log.
  //  */
  // debug?(message: any, ...optionalParams: any[]) {}
  //
  // /**
  //  * Write a 'verbose' level log.
  //  */
  // verbose?(message: any, ...optionalParams: any[]) {}
}
