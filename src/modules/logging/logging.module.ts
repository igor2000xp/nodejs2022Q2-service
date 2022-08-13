import { Module } from '@nestjs/common';
import { MyLoggingService } from './my-logging.service';

@Module({
  providers: [MyLoggingService],
  exports: [MyLoggingService],
})
export class LoggingModule {}
