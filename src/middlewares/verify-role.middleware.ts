import { Request, Response, NextFunction, RequestHandler } from 'express';
import { NotAllowedException } from '../exceptions/not-allowed-exception';

type AvaliableRoles = 'StandardUser' | 'RegisteredUser' | 'Admin';

enum Role {
  'StandardUser' = 0,
  'RegisteredUser' = 2,
  'Admin' = 3
}

export const verifyRoleMiddleware = (role: AvaliableRoles): RequestHandler => {
  return ({ user }: Request, _: Response, next: NextFunction) => {
    if (Role[user.role] === role) {
      next();
    } else {
      next(new NotAllowedException());
    }
  };
};
