import mongoose, { Document } from 'mongoose';
import { Pin } from './interfaces/pin.interface';

const pinSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  }
});

export const pinModel = mongoose.model<Pin & Document>('Pin', pinSchema);
