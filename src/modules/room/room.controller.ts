import { Router, Request, Response, NextFunction } from 'express';

import { Controller } from '../../interfaces/controller.interface';
import { RoomService } from './room.service';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { verifyRoleMiddleware } from '../../middlewares/verify-role.middleware';
import { AddRoomDTO } from './dto/add-room.dto';
import { SearchDataDTO } from './dto/search-data.dto';
import { FilterRoomsDTO } from './dto/filter-rooms.dto';

export class RoomController implements Controller {
  public path = 'rooms';
  public router = Router();
  private roomService = new RoomService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router
      .post(
        `${this.path}/room`,
        authMiddleware,
        verifyRoleMiddleware('RegisteredUser'),
        this.createRoom
      )
      .get(
        `${this.path}/rooms/:hotelId`,
        authMiddleware,
        verifyRoleMiddleware('RegisteredUser'),
        this.getHotelRooms
      )
      .post(`${this.path}/search`, this.searchForRooms)
      .post(`${this.path}/filter`, this.filterRooms)
      .get(`${this.path}/room/:id`, this.getRoom)
      .delete(
        `${this.path}/room/:id`,
        authMiddleware,
        verifyRoleMiddleware('RegisteredUser'),
        this.removeRoom
      );
  }

  private async createRoom(
    { body }: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const roomData: AddRoomDTO = body;

    try {
      const newRoom = await this.roomService.createRoom(roomData);
      res.status(200).json(newRoom);
    } catch (err) {
      next(err);
    }
  }

  private async getHotelRooms(
    { params: { hotelId } }: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const rooms = await this.roomService.getHotelRooms(hotelId);
      res.status(200).json(rooms);
    } catch (err) {
      next(err);
    }
  }

  private async searchForRooms(
    { body }: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const searchData: SearchDataDTO = body;

    try {
      const rooms = await this.roomService.searchForRooms(searchData);
      res.status(200).json(rooms);
    } catch (err) {
      next(err);
    }
  }

  private async filterRooms(
    { body }: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const filterData: FilterRoomsDTO = body;

    try {
      const rooms = await this.roomService.filterRooms(filterData);
      res.status(200).json(rooms);
    } catch (err) {
      next(err);
    }
  }

  private async getRoom(
    { params: { id } }: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const room = await this.roomService.getRoom(id);
      res.status(200).json(room);
    } catch (err) {
      next(err);
    }
  }

  private async removeRoom(
    { params: { id } }: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await this.roomService.removeRoom(id);
    } catch (err) {
      next(err);
    }
  }
}
