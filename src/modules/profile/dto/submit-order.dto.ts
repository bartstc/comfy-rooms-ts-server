import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';

export class SubmitOrderDTO {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsNumber()
  @IsNotEmpty()
  contact!: number;

  @IsNumber()
  @IsNotEmpty()
  total!: number;

  @IsDate()
  @IsNotEmpty()
  checkIn!: Date;

  @IsDate()
  @IsNotEmpty()
  checkOut!: Date;
}
