import { Type } from '../interfaces/room.interface';
import { IsArray } from 'class-validator';

export class FilterDataDTO {
  @IsArray()
  type!: Type[];

  @IsArray()
  stars!: number[];

  @IsArray()
  facilities!: string[];

  @IsArray()
  price!: number[];
}
