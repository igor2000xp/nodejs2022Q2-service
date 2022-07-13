import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as uuid from 'uuid';
import { IUser } from './models';

@Injectable()
export class UserService {
  private users: IUser[] = [];

  create(createUserDto: CreateUserDto) {
    // return `This action adds a new user ${createUserDto.login} with password ${createUserDto.password}`;
    if (createUserDto.login && createUserDto.password) {
      const user: IUser = {
        login: createUserDto.login,
        password: createUserDto.password,
        id: uuid.v4(),
        version: 1,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
      };
      // uuid.validate();
      this.users.push(user);
      return {
        id: user.id,
        login: user.login,
        version: user.version,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'body does not contain required fields',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  getAll() {
    return this.users;
  }

  getById(id: string) {
    if (uuid.validate(id)) {
      const result = this.users.find((user) => user.id === id);
      if (result) {
        return result;
      } else {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: "userId doesn't exist",
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'userId is invalid (not uuid)',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  // updatePut(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action update by method PUT a #${id} user`;
  // }

  remove(id: string) {
    if (uuid.validate(id)) {
      // return `This action removes a #${id} user`;
      let indexForDelete = 0;

      if (
        this.users.find((user, index) => {
          indexForDelete = index;
          return user.id === id;
        })
      ) {
        // this.users.indexOf()
        this.users.splice(indexForDelete);
        return `This action removes a #${id} user`;
      } else {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: "userId doesn't exist",
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'userId is invalid (not uuid)',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
