import { roomModel } from './room.model';
import { hotelModel } from '../hotel/hotel.model';
import { AddRoomDTO } from './dto/add-room.dto';
import { SearchDataDTO } from './dto/search-data.dto';
import { FilterRoomsDTO } from './dto/filter-rooms.dto';
import { keys } from '../../utils/keys';
import { args } from '../../utils/args';
import { RoomNotFoundException } from '../../exceptions/room-not-found-exception';

export class RoomService {
  private room = roomModel;
  private hotel = hotelModel;

  async createRoom(roomData: AddRoomDTO) {
    const { hotelId } = roomData;

    const room = await new this.room({
      ...roomData,
      hotel: hotelId
    }).save();

    await this.hotel.findOneAndUpdate(
      { _id: hotelId },
      { $push: { rooms: room._id } }
    );

    return room;
  }

  async getHotelRooms(hotelId: string) {
    return this.room.find({ hotel: hotelId });
  }

  async searchForRooms(searchData: SearchDataDTO) {
    const searchArgs = args({});

    const isEmpty = (Object.keys(searchData).length = 0);

    for (const key of keys(searchData)) {
      if (!isEmpty) {
        searchArgs[key] = searchData[key];
      }
    }

    return this.room
      .find(searchArgs)
      .populate('hotel')
      .limit(10);
  }

  async filterRooms({ filters, limit, skip, searchData }: FilterRoomsDTO) {
    const filterArgs = args({});
    const searchArgs = args({});

    for (const key of keys(filters)) {
      if (filters[key].length > 0) {
        if (key === 'price') {
          filterArgs[key] = {
            $gte: filters[key][0], // greater than first arg in array of prices
            $lte: filters[key][1] // lower than ...
          };
        }

        if (key === 'facilities') {
          filterArgs[key] = {
            $elemMatch: { $in: filters[key] } // if any element in facilities match
          };
        }

        filterArgs[key] = filters[key];
      }
    }

    const isEmpty = (Object.keys(searchData).length = 0);

    for (const key of keys(searchData)) {
      if (!isEmpty) {
        searchArgs[key] = searchData[key];
      }
    }

    return this.room
      .find({ ...filterArgs, ...searchArgs })
      .populate('hotel')
      .skip(skip)
      .limit(limit);
  }

  async getRoom(roomId: string) {
    const room = await this.room.findById(roomId).populate({
      path: 'hotel',
      populate: { path: 'pin' }
    });

    if (!room) {
      throw new RoomNotFoundException();
    }

    return room;
  }

  async removeRoom(roomId: string) {
    await this.room.findOneAndDelete({ _id: roomId });
  }
}
