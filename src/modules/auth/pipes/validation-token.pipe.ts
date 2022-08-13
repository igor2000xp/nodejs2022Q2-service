import {
  Injectable,
  PipeTransform,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ValidationTokenPipe implements PipeTransform {
  transform(value: any) {
    if (!value) {
      throw new UnauthorizedException('Access denied');
    }
    return value;
  }
}
