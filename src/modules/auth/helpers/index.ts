// import { JwtService } from '@nestjs/jwt';
//
// export const getTokens = async (id: string, login: string, secret: string) => {
//   const accessToken = getAccessToken(id, login);
//   const refreshToken = getRefreshToken(id, login);
//   // await usersService.setRefreshToken(id, refreshToken.refresToken);
//
//   return {
//     ...accessToken,
//     ...refreshToken,
//   };
// };
//
// const getAccessToken = (userId: string, login: string, secret: string) => {
//   const payload = { userId, login };
//   const token = jwtService.sign(payload, {
//     secret,
//     expiresIn: `${configService.get(
//       'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
//     )}s`,
//   });
//   return {
//     accessToken: token,
//   };
// }
