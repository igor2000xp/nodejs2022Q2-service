import { ConsoleLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createAndWriteFile, getLevel, setFileName } from './helpers';
import * as fs from 'fs/promises';
import * as path from 'path';

export class MyLoggingService extends ConsoleLogger {
  private readonly fileSize: number;
  private readonly logLevel: number;
  public logFileFolder: string;
  private readonly contextMiddleWare: string;
  private logFileName = '';
  // private errorFileName = '';
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
    super.log.apply(this, [`${message}`, context, this.contextMiddleWare]);
    await this.writeLogFile(message, 'log', context);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async error(message: string, context?: string) {
    super.error.apply(this, [`${message}`, this.contextMiddleWare]);
    // await this.writeLogToFile(message, 'error', context);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  warn(message: string, context?: string) {
    super.warn.apply(this, [`${message}`, this.contextMiddleWare]);
    // this.writeLogToFile(message, 'warn', context);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  debug(message: string, context?: string) {
    super.debug.apply(this, [`${message}`, this.contextMiddleWare]);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  verbose(message: string, context?: string) {
    super.verbose.apply(this, [`${message}`, this.contextMiddleWare]);
  }

  async writeLogFile(message: string, filePrefix: string, context?: string) {
    let readFileSize: number;
    const filePath = path.resolve(process.cwd(), this.logFileFolder);
    const newContext = this.trueContext(this.context, context);
    if (!this.logFileName) {
      this.logFileName = setFileName(
        this.context,
        this.fileExtension,
        filePrefix,
      );
    } else {
      try {
        const fileStat = await fs.stat(
          path.resolve(filePath, this.logFileName),
        );
        readFileSize = fileStat.size;
      } catch (err) {
        console.log('file is absent');
      }

      if (readFileSize + message.length > this.fileSize) {
        this.logFileName = setFileName(
          newContext,
          this.fileExtension,
          filePrefix,
        );
      }
      await this.writeToFile(message, filePrefix, this.logFileName, newContext);
    }
  }

  trueContext(thisContext: string, context?: string) {
    return context ? `[${context}]` : this.context ? `[${this.context}]` : '';
  }

  async writeToFile(
    message: string,
    filePrefix: string,
    fileNameAndExt: string,
    context: string,
  ) {
    const fileMessage = `${filePrefix.toUpperCase()} ${context} ${message} \n`;
    await createAndWriteFile(fileMessage, context, fileNameAndExt);
  }
}
