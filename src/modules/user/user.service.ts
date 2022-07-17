import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { UserDto } from './dto/user.dto';
import {
  checkOldPassword,
  createNewUser,
  createUserForPrint,
  isFieldsExist,
  isFieldsExistPass,
  validateUserId404,
} from './helpers';
import { InMemoryUserStore } from '../../store/in-memory-user-store';
import { UserEntity } from './entities/user.entity';
import { IUserForPrint } from './models';

@Injectable()
export class UserService {
  // private users: UserDto[] = [];

  constructor(private storage: InMemoryUserStore) {}

  create(createUserDto: CreateUserDto): IUserForPrint {
    isFieldsExist(createUserDto);
    const userObj = createNewUser(createUserDto);
    const newUser = new UserEntity(userObj);
    this.storage.users.push(newUser);
    // return newUser;
    return createUserForPrint(newUser);
  }

  getAll() {
    // return this.users;
    return this.storage.users;
  }

  getById(id: string) {
    // validateUserId404(id, this.users);
    // return this.users.find((user) => user.id === id);
    validateUserId404(id, this.storage.users);
    return this.storage.users.find((usr) => usr.id === id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    isFieldsExistPass(updateUserDto);
    // validateUserId404(id, this.users);
    // const user = this.users.find((us) => us.id === id);
    validateUserId404(id, this.storage.users);
    const user = this.storage.users.find((usr) => usr.id === id);
    checkOldPassword(
      updateUserDto.oldPassword,
      updateUserDto.newPassword,
      user,
    );
    // const index = this.users.indexOf(user);
    const index = this.storage.users.indexOf(user);
    user.version += 1;
    user.password = updateUserDto.newPassword;
    user.updatedAt = new Date().getTime();
    // this.users[index] = user;
    this.storage.users[index] = user;
    // return this.storage.users[index];
    return createUserForPrint(user);
  }

  remove(id: string) {
    // validateUserId404(id, this.users);
    validateUserId404(id, this.storage.users);
    // const index = this.users.findIndex((user) => user.id === id);
    // this.users = [
    //   ...this.users.slice(0, index),
    //   ...this.users.slice(index + 1),
    // ];
    const index = this.storage.users.findIndex((user) => user.id === id);
    this.storage.users = [
      ...this.storage.users.slice(0, index),
      ...this.storage.users.slice(index + 1),
    ];
    return `This action removes a #${id} user`;
  }
}
