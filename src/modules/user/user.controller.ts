import express, { Request, Response, NextFunction } from 'express';

import { Controller } from '../../interfaces/controller.interface';
import { UserService } from './user.service';
import { SignUpDTO } from './dto/sign-up.dto';
import { SignInDTO } from './dto/sign-in.dto';
import { validationMiddleware } from '../../middlewares/validation.middleware';

export class UserController implements Controller {
  public path = '/users';
  public router = express.Router();
  private userService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router
      .post(`${this.path}/signup`, validationMiddleware(SignUpDTO), this.signUp)
      .post(
        `${this.path}/signin`,
        validationMiddleware(SignInDTO),
        this.signIn
      );
  }

  private async signUp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const signUpData: SignUpDTO = req.body;

    try {
      const userData = await this.userService.signUp(signUpData);
      res.status(200).json(userData);
    } catch (err) {
      next(err);
    }
  }

  private async signIn(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const signInData: SignInDTO = req.body;

    try {
      const token = await this.userService.signIn(signInData);
      res.status(200).json({ token: `Bearer ${token}` });
    } catch (err) {
      next(err);
    }
  }
}
