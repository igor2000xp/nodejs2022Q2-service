import { HttpException, HttpStatus } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import * as bcrypt from 'bcrypt';
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

export const checkOldPassword = async (
  oldPass: string,
  user: any,
): Promise<boolean> => {
  // if (user.password === oldPass) {
  // console.log(user.password);
  const isPasswordRight = await bcrypt.compare(oldPass, user.password);
  // console.log(user.password);
  if (isPasswordRight) {
    return true;
  } else {
    // console.log('checkOldPassword - error');
    throw new HttpException(
      {
        status: StatusCodes.FORBIDDEN,
        error: 'old Password is wrong',
      },
      StatusCodes.FORBIDDEN,
    );
  }
};

export const createNewUser = async (
  createUserDto: CreateUserDto,
): Promise<UserEntity> => {
  const createTime = new Date();
  const salt = Number(process.env.CRYPT_SALT);
  // console.log(createUserDto);
  // console.log(createUserDto.password);
  // let passHash: string;
  // const passHash = await bcrypt.hash('secret', 10);
  // await bcrypt.hash('secret', 10, function (err, hash) {
  //   passHash = hash;
  // });
  // const passHash = await bcrypt.hash('secret', salt);
  // console.log(passHash);
  const passwordHash = await bcrypt.hash(createUserDto.password, salt);
  // console.log(passwordHash);
  return new UserEntity({
    createdAt: createTime,
    updatedAt: createTime,
    ...createUserDto,
    // password: await bcrypt.hash(createUserDto.password, salt),
    password: passwordHash,
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
