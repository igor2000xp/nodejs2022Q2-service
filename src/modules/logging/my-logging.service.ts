import { ConsoleLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getLevel } from './helpers';

export class MyLoggingService extends ConsoleLogger {
  private readonly fileSize: number;

  constructor(private config: ConfigService) {
    super();
    this.setLogLevels(getLevel(this.config.get('LOG_LEVEL')));
    this.fileSize = Number(this.config.get('LOG_FILE_SIZE_KB'));
  }
}
