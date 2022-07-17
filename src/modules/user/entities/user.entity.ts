import { Exclude } from 'class-transformer';

export class UserEntity {
  id: string;
  login: string;

  @Exclude()
  password: string;

  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

// It's for the future to implement the methods in the storage

// export class UserEntity {
//   id: string;
//   login: string;
//   password: string;
//   version: number; // integer number, increments on update
//   createdAt: number; // timestamp of creation
//   updatedAt: number; // timestamp of last update
// }
