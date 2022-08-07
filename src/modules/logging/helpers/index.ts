import { LogLevel } from '@nestjs/common';

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
