import { ConsoleLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  createAndWriteFile,
  getLevel,
  setFileName,
  updateFile,
} from './helpers';
import fs from 'fs/promises';
import path from 'path';

export class MyLoggingService extends ConsoleLogger {
  private readonly fileSize: number;
  private readonly logLevel: number;
  private readonly contextMiddleWare: string;
  private logFileName = '';
  private errorFileName = '';
  private readonly fileExtension: string;

  constructor(private config: ConfigService) {
    super();
    this.logLevel = Number(this.config.get('LOG_LEVEL'));
    this.setLogLevels(getLevel(String(this.logLevel)));
    this.fileSize = Number(this.config.get('LOG_FILE_SIZE_KB')) * 1024;
    this.fileExtension = this.config.get('LOG_FILE_EXTENSION');
    this.contextMiddleWare = MyLoggingService.name;
  }

  async log(message: string, context: string) {
    // context = this.contextMiddleWare;
    super.log.apply(this, [`${message}`, context, this.contextMiddleWare]);
    // console.log(message, 'log', context, '!!!!!!!!!!!!!!!!!!');
    await this.writeLogFile(message, 'log', context);
  }

  async error(message: string, context?: string) {
    // if (this.logLevel < 2) return;

    super.error.apply(this, [`${message}`, this.contextMiddleWare]);
    // this.writeLogToFile(message, 'error', context);
    // console.log(message, 'log', context, '!!!!!!!!!!!!!!!!!!');
    // await this.writeLogToFile(message, 'error', context);
  }

  warn(message: string, context?: string) {
    // if (this.logLevel < 3) return;

    super.warn.apply(this, [`${message}`, this.contextMiddleWare]);
    // this.writeLogToFile(message, 'warn', context);
  }

  debug(message: string, context?: string) {
    super.debug.apply(this, [`${message}`, this.contextMiddleWare]);
  }

  verbose(message: string, context?: string) {
    super.verbose.apply(this, [`${message}`, this.contextMiddleWare]);
  }

  async writeLogFile(message: string, filePrefix: string, context?: string) {
    let isUpdate = true;
    let readFileSize: number;
    if (!this.logFileName) {
      this.logFileName = setFileName(this.context, this.fileExtension);
    } else {
      try {
        const file = await fs.stat(
          path.resolve(process.cwd(), 'logs', this.logFileName),
        );
        readFileSize = file.size;
      } catch (err) {
        isUpdate = false;
        console.log('file is absent');
      }

      if (readFileSize + message.length > this.fileSize) {
        console.log(readFileSize, message.length, this.fileSize);
        isUpdate = false;
      }
      console.log(message, filePrefix, this.logFileName, isUpdate, context);
      await this.writeToFile(
        message,
        filePrefix,
        this.logFileName,
        isUpdate,
        context,
      );
    }
  }

  async writeToFile(
    message: string,
    filePrefix: string,
    fileNameAndExt: string,
    isUpdate: boolean,
    context?: string,
  ) {
    const newContext = context
      ? `[${context}]`
      : this.context
      ? `[${this.context}]`
      : '';
    const fileMessage = `${filePrefix.toUpperCase()} ${newContext} ${message} \n`;
    if (!isUpdate) {
      const isNewFile = true;
      //   const fileNameAndExt = setFileName(this.context, this.fileExtension);
      //   fileName = fileNameAndExt;

      await createAndWriteFile(
        fileMessage,
        newContext,
        isNewFile,
        fileNameAndExt,
        this.fileExtension,
      );
    } else {
      await updateFile(
        message,
        newContext,
        fileNameAndExt,
        // this.fileSize,
        // this.fileExtension,
      );
    }
  }
}
