import { IsString, IsNotEmpty, IsArray, IsNumber } from 'class-validator';

import { Type } from '../interfaces/room.interface';

export class AddRoomDTO {
  @IsString()
  @IsNotEmpty()
  hotelId!: string;

  @IsString()
  @IsNotEmpty()
  type!: Type;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsNotEmpty()
  @IsArray()
  facilities!: string[];

  @IsNumber()
  @IsNotEmpty()
  stars!: number;

  @IsNumber()
  @IsNotEmpty()
  price!: number;

  @IsNumber()
  @IsNotEmpty()
  adults!: number;

  @IsNumber()
  @IsNotEmpty()
  children!: number;
}
