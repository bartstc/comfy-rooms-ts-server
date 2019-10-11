export type Type = 'apartment' | 'hotel' | 'villa' | 'guesthouse';

export interface Room {
  hotel: string;
  type: Type;
  city: string;
  facilities: string[];
  stars: number;
  price: number;
  adults: number;
  children: number;
}
