import { HttpException } from './http-exception';

export class RoomNotFoundException extends HttpException {
  constructor() {
    super(404, `Room not found`);
  }
}
