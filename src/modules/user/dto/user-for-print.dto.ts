import { CreateUserDto } from './create-user.dto';
import { OmitType } from '@nestjs/mapped-types';

export class UserForPrintDto extends OmitType(CreateUserDto, [
  'password',
] as const) {}
