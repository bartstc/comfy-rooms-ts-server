import {
  IsString,
  IsArray,
  IsOptional,
  IsNotEmpty,
  ValidateNested,
  IsNumber
} from 'class-validator';

import { Image } from '../interfaces/hotel.interface';
import { CreatePinDTO } from './create-pin.dto';
import { CreateEmailTemplateDTO } from './create-email-template.dto';

export class CreateHotelDTO {
  @IsString()
  @IsNotEmpty()
  type!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsArray()
  @IsOptional()
  images!: Image[];

  @IsNumber()
  @IsNotEmpty()
  stars!: number;

  @IsNumber()
  @IsNotEmpty()
  contact!: number;

  @IsOptional()
  @ValidateNested()
  pin!: CreatePinDTO;

  @IsNotEmpty()
  @ValidateNested()
  emailTemplate!: CreateEmailTemplateDTO;
}
