import express, { Request, Response, NextFunction } from 'express';

import { Controller } from '../../interfaces/controller.interface';
import { AdminProfileService } from './admin-profile.service';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { verifyRoleMiddleware } from '../../middlewares/verify-role.middleware';

export class AdminProfileController implements Controller {
  public path = '/admin';
  public router = express.Router();
  private adminProfileService = new AdminProfileService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router
      .all(`${this.path}/*`, authMiddleware, verifyRoleMiddleware('Admin'))
      .post(`${this.path}/profile`, this.createAdminProfile)
      .put(`${this.path}/register`, this.registerUser);
  }

  private async createAdminProfile(
    { user: { _id } }: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const newProfile = await this.adminProfileService.createAdminProfile(_id);
      res.status(200).json(newProfile);
    } catch (err) {
      next(err);
    }
  }

  private async registerUser(
    { user: { _id }, body: { id: userToRegisterId } }: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const updatedProfile = await this.adminProfileService.registerUser(
        _id,
        userToRegisterId
      );
      res.status(200).json(updatedProfile);
    } catch (err) {
      next(err);
    }
  }
}
