import { Type } from './room.interface';

export interface FilterData {
  type: Type[];
  stars: number[];
  facilities: string[];
  price: number[];
}

export interface SearchData {
  city?: string;
  adults?: number;
  chilren?: number;
}

export interface FilterRooms {
  filters: FilterData;
  limit: number;
  skip: number;
  searchData: SearchData;
}
