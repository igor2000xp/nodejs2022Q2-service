import { HttpException, HttpStatus } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { IUser, IUserForPrint } from '../models';
import { CreateUserDto } from '../dto/create-user.dto';
import * as uuid from 'uuid';
import { UpdateUserDto } from '../dto/update-user.dto';

export const validateUserId404 = (id: string, users: IUser[]): boolean => {
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
  user: IUser,
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

export const createUserForPrint = (user: IUser): IUserForPrint => {
  return {
    id: user.id,
    login: user.login,
    version: user.version,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const createNewUserForPrint = (createUserDto: CreateUserDto): IUser => {
  return {
    login: createUserDto.login,
    password: createUserDto.password,
    id: uuid.v4(),
    version: 1,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  };
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
