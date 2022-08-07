import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { StoreModule } from '../../store/store.module';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [StoreModule, PrismaModule],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
