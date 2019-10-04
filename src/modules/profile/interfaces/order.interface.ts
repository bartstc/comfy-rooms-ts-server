export interface Order {
  rated?: boolean;
  paid?: boolean;
  total: number;
  hotelName: string;
  city: string;
  address: string;
  contact: number;
  checkIn: Date;
  checkOut: Date;
}
