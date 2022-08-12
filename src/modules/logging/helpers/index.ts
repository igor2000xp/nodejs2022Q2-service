import { LogLevel } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
// import { CustomExceptionsFilter } from '../filters/custom-exception.filter';
// import { MyLoggingService } from '../my-logging.service';
import { UnknownElementException } from '@nestjs/core/errors/exceptions/unknown-element.exception';

export const getLevel = (logLevel: string): LogLevel[] => {
  switch (logLevel) {
    case '0':
      return ['log', 'error'];
    case '1':
      return ['log', 'error', 'warn'];
    default:
      return ['log', 'error', 'warn', 'debug', 'verbose'];
  }
};

// const fileName = '';
// const fileExtension = '';
// const fileSize = 1024 * 1024;

export const updateFile = async (
  message: string,
  context: string,
  fileName: string,
  // fileSize: number,
  // fileExtension: string,
) => {
  const filePath = path.resolve(process.cwd(), 'logs');
  // try {
  // const file = await fs.stat(path.resolve('logs', fileName));
  // if (!file || file.size + message.length > fileSize) {
  //   fileName = setFileName(context, fileExtension);
  //
  try {
    await fs.appendFile(
      path.resolve(filePath, fileName),
      `${message} [${context}] \n\n`,
      { flag: 'a', encoding: 'utf8' },
    );
  } catch (err) {
    console.log(err);
  }
  // }
  // } catch (err) {
  //   const message = `Fail to open file ${fileName}`;
  //   console.log(err + ' - ' + message);
  // }
};

export const setFileName = (context, fileExtension): string => {
  const type = context === 'LoggingServiceMiddleware' ? 'logs' : 'errors';
  return `${type}_${Date.now()}.${fileExtension}`;
};

export const createAndWriteFile = async (
  message: string,
  context: string,
  isNewFile = true,
  fileNameAndExt: string,
  fileExtension: string,
) => {
  const filePath = path.resolve(process.cwd(), 'logs');
  try {
    await fs.lstat(filePath);
  } catch (err) {
    await fs.mkdir(filePath, { recursive: true });
  }
  if (isNewFile) {
    fileNameAndExt = setFileName(context, fileExtension);
    console.log(fileNameAndExt);
  }
  try {
    try {
      // await fs.lstat(path.resolve(filePath, fileNameAndExt));
      await fs.appendFile(
        path.resolve(filePath, fileNameAndExt),
        `${message} [${context}] \n\n`,
        { flag: 'a', encoding: 'utf8' },
      );
    } catch (err) {
      console.log('Error file appending');
    }
    console.log(path.resolve(filePath, fileNameAndExt), `${message}`, 'utf8');
  } catch (err) {
    throw new UnknownElementException('File writing Error');
  }
};
