import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { StoreModule } from '../../store/store.module';

@Module({
  imports: [StoreModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
