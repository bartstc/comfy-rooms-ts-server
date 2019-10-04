import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreatePinDTO {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsNotEmpty()
  latitude!: string;

  @IsString()
  @IsNotEmpty()
  longitude!: string;
}
