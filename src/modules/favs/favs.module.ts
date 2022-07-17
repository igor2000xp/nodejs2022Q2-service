import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { StoreModule } from '../../store/store.module';

@Module({
  imports: [StoreModule],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
