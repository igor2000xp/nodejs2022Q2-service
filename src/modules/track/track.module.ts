import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { StoreModule } from '../../store/store.module';

@Module({
  imports: [StoreModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
