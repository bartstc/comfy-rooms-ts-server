import { HttpException } from './http-exception';

export class NotAllowedException extends HttpException {
  constructor() {
    super(405, 'You are not allowed');
  }
}
