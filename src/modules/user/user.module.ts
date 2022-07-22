import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { StoreModule } from '../../store/store.module';

@Module({
  imports: [StoreModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
