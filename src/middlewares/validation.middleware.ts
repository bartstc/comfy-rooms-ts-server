import { RequestHandler, Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

import { HttpException } from '../exceptions/http-exception';

export const validationMiddleware = (
  type: any,
  skipMissingProperties = false
): RequestHandler => {
  return (req: Request, _: Response, next: NextFunction) => {
    validate(plainToClass(type, req.body), { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          // get first error message from array of ValidationErrors
          const message = Object.values(errors[0].constraints)[0];
          next(new HttpException(400, message));
        } else {
          next();
        }
      }
    );
  };
};
