import mongoose, { Document, Schema } from 'mongoose';
import { Profile } from './interfaces/profile.interface';

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  history: [
    {
      rated: {
        type: Boolean,
        default: false
      },
      paid: {
        type: Boolean,
        default: false
      },
      total: {
        type: Number,
        required: true
      },
      hotelName: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      contact: {
        type: Number,
        required: true
      },
      checkIn: {
        type: Date,
        required: true
      },
      checkOut: {
        type: Date,
        required: true
      }
    }
  ]
});

export const profileModel = mongoose.model<Profile & Document>(
  'Profile',
  profileSchema
);
