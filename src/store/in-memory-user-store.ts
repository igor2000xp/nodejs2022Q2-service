import { IUser } from '../modules/user/models';
import { Injectable } from '@nestjs/common';
import { IArtist } from '../modules/artist/models';
import { IAlbum } from '../modules/album/models';
import { ITrack } from '../modules/track/models';
import { IFavorites } from '../modules/favs/models';

@Injectable()
export class InMemoryUserStore {
  users: IUser[] = [];

  artists: IArtist[] = [];

  albums: IAlbum[] = [];

  tracks: ITrack[] = [];

  favorites: IFavorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
}

// constructor(users) {
// this.users = users;
// }
//
// delete(id: string): void {
//   // this.users.filter((usr) => usr.id !== id);
// this.storage.de
// }
//
// findAll(): UserEntity[] {
//   return this.users;
// }
//
// findById(id: string): UserEntity | undefined {
//   return this.users.find((usr) => usr.id === id);
// }
//
// create(createUserDto: CreateUserDto): UserEntity {
//   const newUser = {
//     ...createUserDto,
//     id: uuid.v4(),
//     isDeleted: false,
//   };
//   this.users.push(newUser);
//   return newUser;
// }
//
// update(id: string, updateUserDto: UpdateUserDto): void {
//   const resultUser = this.users.find((usr) => usr.id === id);
//   Object.assign(resultUser, updateUserDto);
// }
// }
