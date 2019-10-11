import mongoose, { Document, Schema } from 'mongoose';
import { Room } from './interfaces/room.interface';

const roomSchema = new Schema({
  hotel: {
    type: Schema.Types.ObjectId,
    ref: 'Hotel'
  },
  type: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  facilities: {
    type: [String],
    required: true
  },
  stars: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  adults: {
    type: Number,
    required: true
  },
  children: {
    type: Number,
    required: true
  }
});

export const roomModel = mongoose.model<Room & Document>('Room', roomSchema);
