import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { Prisma } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  checkOldPassword,
  createNewUser,
  isFieldsExist,
  isFieldsExistPass,
  validateId404,
} from './helpers';
import { UserEntity } from './entities/user.entity';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    isFieldsExist(createUserDto);
    const userObj = await createNewUser(createUserDto);
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

  async getByLogin(login: string) {
    try {
      return await this.prisma.user.findFirst({
        where: { login },
      });
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    isFieldsExistPass(updateUserDto);
    await validateId404(id, await this.prisma.user.findMany());
    const user = await this.prisma.user.findFirst({ where: { id } });
    await checkOldPassword(updateUserDto.oldPassword, user);

    const salt = Number(process.env.CRYPT_SALT);
    const newPasswordHash = await bcrypt.hash(updateUserDto.newPassword, salt);
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: newPasswordHash,
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

  async userByLogin(
    userWhereInput: Prisma.UserWhereInput,
  ): Promise<UserEntity | null> {
    return await this.prisma.user.findFirst({
      where: userWhereInput,
    });
  }
}
