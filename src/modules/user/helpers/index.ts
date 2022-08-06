import { HttpException, HttpStatus } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

export const validateId404 = async (
  id: string,
  users: any[],
): Promise<boolean> => {
  if (users.find((usr) => usr.id === id)) {
    return true;
  } else {
    throw new HttpException(
      {
        state: StatusCodes.NOT_FOUND,
        error: "record with id === userId doesn't exist",
      },
      StatusCodes.NOT_FOUND,
    );
  }
};

export const checkOldPassword = (
  oldPass: string,
  newPass: string,
  user: any,
): boolean => {
  if (user.password === oldPass) {
    return true;
  } else {
    throw new HttpException(
      {
        status: StatusCodes.FORBIDDEN,
        error: 'old Password is wrong',
      },
      StatusCodes.FORBIDDEN,
    );
  }
};

export const createNewUser = (createUserDto: CreateUserDto): UserEntity => {
  const createTime = new Date();
  return new UserEntity({
    createdAt: createTime,
    updatedAt: createTime,
    ...createUserDto,
  });
};

export const isFieldsExist = (createUserDto: CreateUserDto) => {
  if (createUserDto.login && createUserDto.password) {
    return true;
  } else {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'body does not contain required fields',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
};

export const isFieldsExistPass = (updateUserDto: UpdateUserDto) => {
  if (updateUserDto.oldPassword && updateUserDto.newPassword) {
    return true;
  } else {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'body does not contain required fields',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
};
