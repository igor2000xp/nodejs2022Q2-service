import { ConsoleLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getLevel, setFileName, writeToFile } from './helpers';
import * as fs from 'fs/promises';
import * as path from 'path';

export class MyLoggingService extends ConsoleLogger {
  private readonly fileSize: number;
  private readonly logLevel: number;
  public logFileFolder: string;
  private readonly contextMiddleWare: string;
  private logFileName = 'log_0init.txt';
  private errorFileName = 'error_0init.txt';
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
    this.logFileName = await this.writeLogFile(
      message,
      'log',
      this.logFileName,
      context,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async error(message: string, context?: string) {
    super.error.apply(this, [`${message}`, this.contextMiddleWare]);
    this.errorFileName = await this.writeLogFile(
      message,
      'error',
      this.errorFileName,
      context,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  warn(message: string, context?: string) {
    super.warn.apply(this, [`${message}`, this.contextMiddleWare]);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  debug(message: string, context?: string) {
    super.debug.apply(this, [`${message}`, this.contextMiddleWare]);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  verbose(message: string, context?: string) {
    super.verbose.apply(this, [`${message}`, this.contextMiddleWare]);
  }

  async writeLogFile(
    message: string,
    filePrefix: string,
    fileName: string,
    context?: string,
  ) {
    let readFileSize: number;
    const filePathFileName = path.resolve(
      process.cwd(),
      this.logFileFolder,
      fileName,
    );
    const newContext = this.trueContext(this.context, context);
    try {
      const fileStat = await fs.stat(filePathFileName);
      readFileSize = fileStat.size;
    } catch (err) {
      console.log('file is absent');
    }

    if (readFileSize + message.length > this.fileSize) {
      fileName = setFileName(newContext, this.fileExtension, filePrefix);
    }
    await writeToFile(message, filePrefix, fileName, newContext);
    return fileName;
  }

  trueContext(thisContext: string, context?: string) {
    return context ? `[${context}]` : this.context ? `[${this.context}]` : '';
  }
}
