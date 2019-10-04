import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class AddOpinionDTO {
  @IsString()
  @IsNotEmpty()
  hotelName!: string;

  @IsString()
  @IsNotEmpty()
  orderId!: string;

  @IsString()
  @IsNotEmpty()
  text!: string;

  @IsNumber()
  @IsNotEmpty()
  rating!: number;
}
