import { FilterDataDTO } from './filter-data.dto';
import { ValidateNested, IsNumber, IsNotEmpty } from 'class-validator';
import { SearchDataDTO } from './search-data.dto';

export class FilterRoomsDTO {
  @ValidateNested()
  @IsNotEmpty()
  filters!: FilterDataDTO;

  @IsNumber()
  @IsNotEmpty()
  limit!: number;

  @IsNumber()
  @IsNotEmpty()
  skip!: number;

  @ValidateNested()
  @IsNotEmpty()
  searchData!: SearchDataDTO;
}
