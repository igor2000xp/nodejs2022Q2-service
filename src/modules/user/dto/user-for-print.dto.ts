// import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { OmitType } from '@nestjs/mapped-types';
//
// export class userDto extends PartialType(CreateUserDto) {}

export class UserForPrintDto extends OmitType(CreateUserDto, [
  'password',
] as const) {}
