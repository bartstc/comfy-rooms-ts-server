import { IsString, IsEmail } from 'class-validator';

export class SignInDTO {
  @IsString()
  password!: string;

  @IsString()
  @IsEmail()
  email!: string;
}
