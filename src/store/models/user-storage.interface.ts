import { UserEntity } from '../../modules/user/entities/user.entity';
import { CreateUserDto } from '../../modules/user/dto/create-user.dto';
import { IUser } from '../../modules/user/models';
import { UpdateUserDto } from '../../modules/user/dto/update-user.dto';

export interface IUserStorage {
  delete: (id: string) => void;
  findById: (id: string) => UserEntity | undefined;
  create: (createUserDto: CreateUserDto) => IUser;
  update: (id: string, updateUserDto: UpdateUserDto) => IUser;
}
