import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDTO {
  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;
}
