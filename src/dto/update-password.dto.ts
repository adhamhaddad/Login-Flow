import { IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  current_password: string;

  @IsString()
  new_password: string;
}
