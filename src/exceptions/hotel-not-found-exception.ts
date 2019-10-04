import { HttpException } from './http-exception';

export class HotelNotFoundException extends HttpException {
  constructor() {
    super(404, `Hotel not found`);
  }
}
