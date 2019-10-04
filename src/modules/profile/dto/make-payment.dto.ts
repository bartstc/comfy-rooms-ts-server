import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class MakePaymentDTO {
  @IsNumber()
  @IsNotEmpty()
  total!: number;

  @IsNotEmpty()
  token!: {
    id: string;
  };

  @IsString()
  @IsNotEmpty()
  orderId!: string;
}
