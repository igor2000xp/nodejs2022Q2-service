import { Module } from '@nestjs/common';
import { InMemoryUserStore } from './in-memory-user-store';

@Module({
  providers: [InMemoryUserStore],
  exports: [InMemoryUserStore],
})
export class StoreModule {}
