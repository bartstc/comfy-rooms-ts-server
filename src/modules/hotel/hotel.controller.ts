import { Router, Request, Response, NextFunction } from 'express';
import cloudinary from 'cloudinary';

import { Controller } from '../../interfaces/controller.interface';
import { HotelService } from './hotel.service';
import { CreateHotelDTO } from './dto/create-hotel.dto';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { verifyRoleMiddleware } from '../../middlewares/verify-role.middleware';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY as string,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET as string
});

export class HotelController implements Controller {
  public path = 'hotels';
  public router = Router();
  private hotelService = new HotelService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router
      .all(
        `${this.path}/*`,
        authMiddleware,
        verifyRoleMiddleware('RegisteredUser')
      )
      .post(`${this.path}/hotel`, this.createHotel)
      .get(`${this.path}/hotels`, this.getUserHotels)
      .post(`${this.path}/uploadimage`, this.uploadImage)
      .get(`${this.path}/removeimage`, this.removeImage);
  }

  private async createHotel(
    { user: { _id }, body }: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const hotelData: CreateHotelDTO = body;

    try {
      const newHotel = await this.hotelService.createHotel(_id, hotelData);
      res.status(200).json(newHotel);
    } catch (err) {
      next(err);
    }
  }

  private async getUserHotels(
    { user: { _id } }: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const hotels = await this.hotelService.getUserHotels(_id);
      res.status(200).json(hotels);
    } catch (err) {
      next(err);
    }
  }

  private uploadImage(
    { files: { file } }: Request,
    res: Response,
    _: NextFunction
  ): void {
    cloudinary.uploader.upload(
      file.path,
      result => {
        res.status(200).json({
          public_id: result.public_id,
          url: result.url
        });
      },
      {
        public_id: `${Date.now()}`,
        resource_type: 'auto'
      }
    );
  }

  private removeImage(
    { query: { public_id } }: Request,
    res: Response,
    next: NextFunction
  ): void {
    cloudinary.uploader.destroy(public_id, (err, result) => {
      if (err) {
        next(err);
      }
      res.status(200).json({ success: 'true' });
    });
  }
}
