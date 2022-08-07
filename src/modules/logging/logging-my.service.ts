// import { Injectable } from '@nestjs/common';
//
// @Injectable()
// export class LoggingMyService {}

import { ConsoleLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getLevel } from './helpers';

export class LoggingMyService extends ConsoleLogger {
  private fileName = '';
  private readonly fileSize: number;

  constructor(
    // options: ConsoleLoggerOptions,
    private config: ConfigService,
  ) {
    // super(context, {
    //   ...options,
    // });
    super();
    this.setLogLevels(getLevel(this.config.get('LOG_LEVEL')));
    // this.setLogLevels(['log', 'error']);
    this.fileSize = Number(this.config.get('LOG_FILE_SIZE_KB'));
    // console.log(this.fileSize);
    // console.log(config.get('LOG_LEVEL'));
  }
  // export class LoggingMyService extends ConsoleLogger {
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
