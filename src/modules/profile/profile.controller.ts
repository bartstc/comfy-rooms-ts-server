import { Router, Request, Response, NextFunction } from 'express';

import { Controller } from '../../interfaces/controller.interface';
import { ProfileService } from './profile.service';
import { SubmitOrderDTO } from './dto/submit-order.dto';
import { MakePaymentDTO } from './dto/make-payment.dto';
import { AddOpinionDTO } from './dto/add-opinion.dto';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { verifyRoleMiddleware } from '../../middlewares/verify-role.middleware';

export class ProfileController implements Controller {
  public path = 'profiles';
  public router = Router();
  private profileService = new ProfileService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router
      .all(`${this.path}/*`, authMiddleware)
      .get(`${this.path}/profile`, this.getProfile)
      .post(
        `${this.path}/user_profile`,
        verifyRoleMiddleware('StandardUser'),
        this.createUserProfile
      )
      .put(
        `${this.path}/registration`,
        verifyRoleMiddleware('StandardUser'),
        this.askForRegistration
      )
      .put(
        `${this.path}/order`,
        verifyRoleMiddleware('StandardUser'),
        this.submitOrder
      )
      .put(
        `${this.path}/payment`,
        verifyRoleMiddleware('StandardUser'),
        this.handlePayment
      )
      .put(
        `${this.path}/opinion`,
        verifyRoleMiddleware('StandardUser'),
        this.addOpinion
      );
  }

  private async createUserProfile(
    { user: { _id } }: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const newProfile = await this.profileService.createUserProfile(_id);
      res.status(200).json(newProfile);
    } catch (err) {
      next(err);
    }
  }

  private async getProfile(
    { user: { _id, role } }: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const profile = await this.profileService.getProfile(_id, role);
      res.status(200).json(profile);
    } catch (err) {
      next(err);
    }
  }

  private async askForRegistration(
    { user: { _id } }: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const updatedProfile = await this.profileService.askForRegistration(_id);
      res.status(200).json(updatedProfile);
    } catch (err) {
      next(err);
    }
  }

  private async submitOrder(
    { user: { _id }, body }: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const orderData: SubmitOrderDTO = body;

    try {
      const updatedProfile = await this.profileService.submitOrder(
        _id,
        orderData
      );
      res.status(200).json(updatedProfile);
    } catch (err) {
      next(err);
    }
  }

  private async handlePayment(
    { user: { _id }, body }: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const paymentData: MakePaymentDTO = body;

    try {
      const updatedProfile = await this.profileService.handlePayment(
        _id,
        paymentData
      );
      res.status(200).json(updatedProfile);
    } catch (err) {
      next(err);
    }
  }

  private async addOpinion(
    { user, body }: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const opinionData: AddOpinionDTO = body;

    try {
      const updatedProfile = await this.profileService.addOpinion(
        user,
        opinionData
      );
      res.status(200).json(updatedProfile);
    } catch (err) {
      next(err);
    }
  }
}
