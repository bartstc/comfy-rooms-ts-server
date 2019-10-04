import { Order } from './order.interface';

export interface Profile {
  user: string;
  history: Order[];
}
