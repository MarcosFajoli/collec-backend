import { IsEmail, IsString } from 'class-validator';

export class CreateContaDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;
}
