import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { StoreModule } from '../../store/store.module';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [StoreModule, PrismaModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
