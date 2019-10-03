import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';

import { userModel } from '../modules/user/user.model';
import { DataStoredInToken } from '../modules/user/interfaces/data-stored-in-token.interface';
import { HttpException } from '../exceptions/http-exception';
import { WrongAuthenticationTokenException } from '../exceptions/wrong-authentication-token-exception';
import { AuthenticationTokenMissingException } from '../exceptions/authentication-token-missing-exception';

export const authMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const secret = process.env.JWT_SECRET;
  const token = req.header('Authorization');

  if (!secret) {
    next(new HttpException(500, 'Internal server error'));
    return;
  }

  if (!token) {
    next(new AuthenticationTokenMissingException());
    return;
  }

  try {
    const decoded = jwt.verify(token, secret) as DataStoredInToken;
    const user = await userModel.findById(decoded.id);

    if (!user) {
      next(new WrongAuthenticationTokenException());
      return;
    }

    req.user = user;
    next();
  } catch (e) {
    next(new WrongAuthenticationTokenException());
  }
};
