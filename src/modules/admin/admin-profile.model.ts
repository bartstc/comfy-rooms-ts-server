import mongoose, { Schema, Document } from 'mongoose';
import { AdminProfile } from './interfaces/admin-profile.interface';

const adminProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  requests: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ]
});

export const adminProfileModel = mongoose.model<AdminProfile & Document>(
  'AdminProfile',
  adminProfileSchema
);
