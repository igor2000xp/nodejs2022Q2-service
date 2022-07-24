import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { StoreModule } from '../../store/store.module';

@Module({
  imports: [StoreModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
