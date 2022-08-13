import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as path from 'path';
import { parse } from 'yaml';
import { readFile } from 'fs/promises';
import { ConfigService } from '@nestjs/config';
import { MyLoggingService } from './modules/logging/my-logging.service';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const DOC_API = await readFile(
    path.resolve(process.cwd(), 'doc', 'api.yaml'),
    'utf-8',
  );
  const document = parse(DOC_API);
  SwaggerModule.setup('doc', app, document);

  const config = app.get(ConfigService);

  const logger = new MyLoggingService(config);
  logger.setContext(bootstrap.name);

  // Event: 'uncaughtException' https://nodejs.org/docs/latest-v16.x/api/process.html#event-uncaughtexception
  process.on('uncaughtException', (err: Error) => {
    const errorLog = `Uncaught Exception: ${JSON.stringify(err.stack || err)}`;
    console.error(`uncaughtException happened:`);
    logger.error(errorLog, bootstrap.name);
  });
  process.on('unhandledRejection', (err: Error) => {
    const errorLog = `Unhandled Rejection: ${JSON.stringify(err.stack || err)}`;
    console.error(`uncaughtException happened:`);
    logger.error(errorLog, bootstrap.name);
  });

  await app.listen(PORT);
  logger.debug(`Application listening port ${PORT}`, 'bootstrap');
}
bootstrap();
