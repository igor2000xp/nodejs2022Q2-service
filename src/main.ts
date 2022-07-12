import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as path from 'path';
import { parse } from 'yaml';
import { readFile } from 'fs/promises';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const config = new DocumentBuilder()
  //   .setTitle('Cats example')
  //   .setDescription('The cats API description')
  //   .setVersion('1.0')
  //   .addTag('cats')
  //   .build();
  const DOC_API = await readFile(
    path.resolve(process.cwd(), 'doc', 'api.yaml'),
    'utf-8',
  );
  const document = parse(DOC_API);
  SwaggerModule.setup('doc', app, document);
  SwaggerModule.setup('doc', app, document);

  await app.listen(4000);
}
bootstrap();
