import { ConsoleLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  createAndWriteFile,
  getLevel,
  setFileName,
  updateFile,
} from './helpers';
import * as fs from 'fs/promises';
import * as path from 'path';

export class MyLoggingService extends ConsoleLogger {
  private readonly fileSize: number;
  private readonly logLevel: number;
  public logFileFolder: string;
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
    this.logFileFolder = this.config.get('LOG_FILE_FOLDER');
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
    const filePath = path.resolve(process.cwd(), this.logFileFolder);
    // console.log(path.resolve(filePath, this.logFileName));
    if (!this.logFileName) {
      this.logFileName = setFileName(this.context, this.fileExtension, filePrefix);
    } else {
      try {
        // console.log(path.resolve('logs', this.logFileName));
        // **************
        const fileStat = await fs.stat(
          path.resolve('logs', this.logFileName),
        );
        readFileSize = fileStat.size;
        // console.log('file');
      } catch (err) {
        isUpdate = false;
        console.log('file is absent');
      }

      if (readFileSize + message.length > this.fileSize) {
        // console.log(readFileSize, message.length, this.fileSize);
        // isUpdate = false;
        this.logFileName = setFileName(context, this.fileExtension, filePrefix);
      }

      // console.log(readFileSize, message.length, this.fileSize, '***********', path.resolve(process.cwd(), 'logs', this.logFileName));
      // console.log(message, filePrefix, this.logFileName, isUpdate, context);
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
    console.log(!isUpdate);
    if (!isUpdate) {
      console.log('createAndWriteFile');
      const isNewFile = true;
      //   const fileNameAndExt = setFileName(this.context, this.fileExtension);
      //   fileName = fileNameAndExt;

      await createAndWriteFile(
        fileMessage,
        newContext,
        // isNewFile,
        fileNameAndExt,
        this.fileExtension,
        filePrefix,
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
