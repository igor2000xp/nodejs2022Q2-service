import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { StoreModule } from '../../store/store.module';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [StoreModule, PrismaModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
