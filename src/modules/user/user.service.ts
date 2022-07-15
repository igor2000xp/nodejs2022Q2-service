import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import {
  checkOldPassword,
  createNewUserForPrint,
  createUserForPrint,
  isFieldsExist,
  isFieldsExistPass,
  validateUserId404,
} from './helpers';

@Injectable()
export class UserService {
  private users: UserDto[] = [];

  // constructor(users) {
  //   this.users = users;
  // }

  create(createUserDto: CreateUserDto) {
    isFieldsExist(createUserDto);
    const user = createNewUserForPrint(createUserDto);
    this.users.push(user);
    return createUserForPrint(user);
  }

  getAll() {
    return this.users;
  }

  getById(id: string) {
    validateUserId404(id, this.users);
    return this.users.find((user) => user.id === id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    isFieldsExistPass(updateUserDto);
    validateUserId404(id, this.users);
    const user = this.users.find((us) => us.id === id);
    checkOldPassword(
      updateUserDto.oldPassword,
      updateUserDto.newPassword,
      user,
    );
    const index = this.users.indexOf(user);
    user.version += 1;
    user.password = updateUserDto.newPassword;
    user.updatedAt = new Date().getTime();
    this.users[index] = user;

    return createUserForPrint(user);
  }

  remove(id: string) {
    validateUserId404(id, this.users);
    const index = this.users.findIndex((user) => user.id === id);
    this.users = [
      ...this.users.slice(0, index),
      ...this.users.slice(index + 1),
    ];
    return `This action removes a #${id} user`;
  }
}
