import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RootModule } from './modules/root.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [RootModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
