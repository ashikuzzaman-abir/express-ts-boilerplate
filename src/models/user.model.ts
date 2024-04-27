import jwt from 'jsonwebtoken';
import mongoose, { Document, Schema } from 'mongoose';
import { JWT_PRIVATE_KEY } from '../config/main.config';

export type UserModelType = Document & {
  name: string;
  email: string;
  password: string;
  isActive?: boolean;
  dateOfBirth: Date;
  generateAuthToken: () => string;
};

const schema = new Schema<UserModelType>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'Email is required'],
      lowercase: true,
      index: true,
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      maxlength: [1024, 'Password cannot be more than 1024 characters'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

schema.methods.generateAuthToken = function (this: UserModelType) {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      dateOfBirth: this.dateOfBirth,
    },
    JWT_PRIVATE_KEY
  );
  return token;
};

const User = mongoose.model<UserModelType>('User', schema);
export default User;
