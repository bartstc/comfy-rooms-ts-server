import { IsString, IsNotEmpty } from 'class-validator';

export class CreateEmailTemplateDTO {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  subject!: string;

  @IsString()
  @IsNotEmpty()
  body!: string;
}
