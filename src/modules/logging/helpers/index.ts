import { LogLevel } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

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

export const setFileName = (
  context,
  fileExtension: string,
  filePrefix: string,
): string => {
  return `${filePrefix}_${Date.now()}.${fileExtension}`;
};

export const createAndWriteFile = async (
  message: string,
  context: string,
  fileNameAndExt: string,
) => {
  const filePath = path.resolve(process.cwd(), process.env.LOG_FILE_FOLDER);
  try {
    await fs.lstat(filePath);
  } catch (err) {
    await fs.mkdir(filePath, { recursive: true });
  }
  try {
    await fs.appendFile(
      path.resolve(filePath, fileNameAndExt),
      `${message} [${context}] \n\n`,
      { flag: 'a', encoding: 'utf8' },
    );
  } catch (err) {
    console.log('Error file appending');
  }
};
