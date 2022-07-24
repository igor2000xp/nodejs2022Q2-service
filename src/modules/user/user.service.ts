import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  checkOldPassword,
  createNewUser,
  isFieldsExist,
  isFieldsExistPass,
  validateId404,
} from './helpers';
import { UserEntity } from './entities/user.entity';
// import { IUser, IUserForPrint } from './models';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  // private storage: InMemoryUserStore,

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    isFieldsExist(createUserDto);
    const userObj = createNewUser(createUserDto);
    const newUser = await this.prisma.user.create({ data: userObj });
    return plainToInstance(UserEntity, newUser);
  }

  async getAll(): Promise<UserEntity[]> {
    return await this.prisma.user.findMany();
  }

  async getById(id: string) {
    await validateId404(id, await this.prisma.user.findMany());
    return await this.prisma.user.findFirst({
      where: { id },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    isFieldsExistPass(updateUserDto);
    await validateId404(id, await this.prisma.user.findMany());
    const users = await this.prisma.user.findMany();
    const user = users.find((usr) => usr.id === id);
    checkOldPassword(
      updateUserDto.oldPassword,
      updateUserDto.newPassword,
      user,
    );
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: updateUserDto.newPassword,
        version: { increment: 1 },
        updatedAt: new Date(),
      },
    });

    return plainToInstance(UserEntity, updatedUser);
  }

  async remove(id: string) {
    await validateId404(id, await this.prisma.user.findMany());
    await this.prisma.user.delete({ where: { id } });
    return `This action removes a #${id} user`;
  }
}
