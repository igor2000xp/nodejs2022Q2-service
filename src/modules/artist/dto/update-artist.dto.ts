import { IsBoolean, IsString } from 'class-validator';

export class UpdateArtistDto {
  // extends PartialType(CreateArtistDto) {}
  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
