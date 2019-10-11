import { IsString, IsOptional, IsNumber } from 'class-validator';

export class SearchDataDTO {
  @IsString()
  @IsOptional()
  city?: string;

  @IsNumber()
  @IsOptional()
  adults?: number;

  @IsNumber()
  @IsOptional()
  children?: number;
}
