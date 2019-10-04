import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpDTO {
  @IsString()
  @IsNotEmpty()
  fullname!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;
}
