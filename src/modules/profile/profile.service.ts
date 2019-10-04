import Stripe from 'stripe';

import { userModel } from '../user/user.model';
import { hotelModel } from '../hotel/hotel.model';
import { profileModel } from './profile.model';
import { adminProfileModel } from '../admin/admin-profile.model';
import { User } from '../user/interfaces/user.interface';
import { Order } from './interfaces/order.interface';
import { Opinion } from '../hotel/interfaces/opinion.interface';
import { AddOpinionDTO } from './dto/add-opinion.dto';
import { MakePaymentDTO } from './dto/make-payment.dto';
import { SubmitOrderDTO } from './dto/submit-order.dto';
import { HotelNotFoundException } from '../../exceptions/hotel-not-found-exception';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export class ProfileService {
  private user = userModel;
  private hotel = hotelModel;
  private profile = profileModel;
  private adminProfile = adminProfileModel;

  async createUserProfile(userId: string) {
    return new this.profile({ user: userId }).save();
  }

  async getProfile(userId: string, role: number) {
    switch (role) {
      case 0:
        const userProfile = await this.profile.findOne({ user: userId });

        if (!userProfile) {
          return {};
        }
        return userProfile;

      case 1:
        return {
          status: 'Is waiting for registration'
        };

      case 2:
        return this.hotel.find({ owner: userId });

      case 3:
        return this.adminProfile.findOne({ user: userId });

      default:
        return {};
    }
  }

  async askForRegistration(userId: string) {
    await this.adminProfile.findOneAndUpdate(
      { user: process.env.ADMIN_ID_1 as string },
      { $push: { requests: { user: userId } } }
    );

    return this.user.findOneAndUpdate(
      { _id: userId },
      { role: 1 },
      { new: true }
    );
  }

  async submitOrder(userId: string, orderData: SubmitOrderDTO) {
    const newOrder: Order = { ...orderData, hotelName: orderData.name };

    return this.profile.findOneAndUpdate(
      { user: userId },
      { $push: { history: newOrder } },
      { new: true }
    );
  }

  async handlePayment(
    userId: string,
    { total, token, orderId }: MakePaymentDTO
  ) {
    await stripe.charges.create({
      amount: total * 100,
      currency: 'usd',
      description: `To pay: ${total}`,
      source: token.id
    });

    return this.profile.updateOne(
      { user: userId, 'history._id': orderId },
      { $set: { 'history.$.paid': true } }
    );
  }

  async addOpinion(
    { _id, fullname }: User,
    { hotelName, orderId, text, rating }: AddOpinionDTO
  ) {
    const newOpinion: Opinion = { fullname, text, rating };

    const hotel = await this.hotel.findOne({ name: hotelName });

    if (!hotel) {
      throw new HotelNotFoundException();
    }

    const updatedRating =
      (hotel.rating * hotel.opinions.length + rating) /
      (hotel.opinions.length + 1);
    hotel.rating = updatedRating;
    hotel.opinions.push(newOpinion);

    await hotel.save();

    return this.profile.updateOne(
      { user: _id, 'history._id': orderId },
      { $set: { 'history.$.rated': true } }
    );
  }
}
