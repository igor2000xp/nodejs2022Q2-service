import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as path from 'path';
import { parse } from 'yaml';
import { readFile } from 'fs/promises';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const DOC_API = await readFile(
    path.resolve(process.cwd(), 'doc', 'api.yaml'),
    'utf-8',
  );
  const document = parse(DOC_API);
  SwaggerModule.setup('doc', app, document);
  // SwaggerModule.setup('doc', app, document);

  await app.listen(PORT);
}
bootstrap();
