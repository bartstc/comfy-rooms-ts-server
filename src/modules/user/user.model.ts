import mongoose, { Document } from 'mongoose';
import { User } from './interfaces/user.interface';

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    default: 0
    /* ROLES
      - 0: user
      - 1: pending registration (after registration, the user can add his hotel offers)
      - 2: registered, allowed to add hotel offers
      - 3: admin
    */
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export const userModel = mongoose.model<User & Document>('User', userSchema);
