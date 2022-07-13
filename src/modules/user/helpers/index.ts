import * as uuid from 'uuid';
import { HttpException } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { UpdateUserDto } from '../dto/update-user.dto';

export const validateUserId = (id: string): boolean => {
  if (uuid.validate(id)) {
    return true;
  } else {
    throw new HttpException(
      {
        status: StatusCodes.BAD_REQUEST,
        error: 'userId is invalid (not uuid)',
      },
      StatusCodes.BAD_REQUEST,
    );
  }
};

export interface IUserForPrint {
  id: string; // uuid v4
  login: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export const createUserObj = (
  updateUserDto: UpdateUserDto,
  id: string,
  users,
) => {
  console.log(updateUserDto);
  // const user = users.find((us) => us.id === id);
  // user.login = updateUserDto.login ? updateUserDto.login : user.login;
  // user.version = updateUserDto.version ? updateUserDto.version : user.version;
  // user.createdAt = updateUserDto.createdAt
  //   ? updateUserDto.createdAt
  //   : user.createdAt;
  // user.updatedAt = new Date().getTime();
  // users = { ...user };
  //
  // const userForPrint: IUserForPrint = {
  //   id: user.id,
  //   login: user.login,
  //   version: user.version,
  //   createdAt: user.createdAt,
  //   updatedAt: user.updatedAt,
  // };
  //
  // console.log(userForPrint);

  return updateUserDto;
};
