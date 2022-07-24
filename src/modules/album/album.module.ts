import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { StoreModule } from '../../store/store.module';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [StoreModule, PrismaModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
