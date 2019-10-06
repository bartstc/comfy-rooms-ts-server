import { hotelModel } from './hotel.model';
import { pinModel } from './pin.model';
import { CreateHotelDTO } from './dto/create-hotel.dto';

export class HotelService {
  private hotel = hotelModel;
  private pin = pinModel;

  async createHotel(userId: string, hotelData: CreateHotelDTO) {
    const { pin, images } = hotelData;

    const newPin = await new this.pin({
      ...pin,
      image: images.length ? images[0].url : null
    }).save();

    return new this.hotel({
      ...hotelData,
      owner: userId,
      pin: newPin._id
    }).save();
  }

  async getUserHotels(userId: string) {
    return this.hotel.find({ owner: userId });
  }
}
