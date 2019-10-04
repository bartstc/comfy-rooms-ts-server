import mongoose, { Document, Schema } from 'mongoose';
import { Hotel } from './interfaces/hotel.interface';

const hotelSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  pin: {
    type: Schema.Types.ObjectId,
    ref: 'Pin'
  },
  type: {
    type: String,
    required: true
  },
  stars: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  name: {
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
  description: {
    type: String,
    required: true
  },
  contact: {
    type: Number,
    required: true
  },
  images: {
    type: Array,
    default: []
  },
  emailTemplate: {
    title: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    }
  },
  rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Room'
    }
  ],
  opinions: [
    {
      fullname: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      date: {
        type: Date,
        default: new Date()
      }
    }
  ]
});

export const hotelModel = mongoose.model<Hotel & Document>(
  'Hotel',
  hotelSchema
);
