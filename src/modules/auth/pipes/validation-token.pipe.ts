import {
  // ArgumentMetadata,
  Injectable,
  PipeTransform,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ValidationTokenPipe implements PipeTransform {
  // transform(value: any, metadata: ArgumentMetadata) {
  transform(value: any) {
    if (!value) {
      throw new UnauthorizedException('Access denied');
    }
    return value;
  }
}
