import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
// export class JwtAuthGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     return true;
//   }
// }
