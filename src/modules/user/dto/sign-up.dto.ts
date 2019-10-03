import { IsString, IsEmail } from 'class-validator';

export class SignUpDTO {
  @IsString()
  fullname!: string;

  @IsString()
  password!: string;

  @IsString()
  @IsEmail()
  email!: string;
}
