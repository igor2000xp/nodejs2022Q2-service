// import { IUser } from '../user/models';
// import { HttpException } from '@nestjs/common';
// import { StatusCodes } from 'http-status-codes';
//
// export const validateId404 = (id: string, users: IUser[]): boolean => {
//   if (users.find((usr) => usr.id === id)) {
//     return true;
//   } else {
//     throw new HttpException(
//       {
//         state: StatusCodes.NOT_FOUND,
//         error: "record with id === userId doesn't exist",
//       },
//       StatusCodes.NOT_FOUND,
//     );
//   }
// };
