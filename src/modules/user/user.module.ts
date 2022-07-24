import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { StoreModule } from '../../store/store.module';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [StoreModule, PrismaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
