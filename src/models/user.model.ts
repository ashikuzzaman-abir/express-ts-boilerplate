import jwt from 'jsonwebtoken';
import mongoose, { Document, Schema } from 'mongoose';
import { AddressType, EmergencyContactType } from './types/index.js';

export type UserType = Document & {
  name: string;
  email: string;
  phone: string;
  password: string;
  isActive: boolean;
  role: mongoose.Schema.Types.ObjectId;
  nid?: string;
  joiningDate?: Date;
  address?: AddressType;
  emergencyContact?: EmergencyContactType;
  dateOfBirth?: Date;
  profileImage?: string;
  createdBy?: mongoose.Schema.Types.ObjectId;
  generateAuthToken: () => string;
};

const schema = new Schema<UserType>(
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
    phone: {
      type: String,
      trim: true,
      unique: true,
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
      required: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
    dateOfBirth: {
      type: Date,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    profileImage: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

schema.methods.generateAuthToken = function (this: UserType) {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      role: this.role,
    },
    process.env.JWT_PRIVATE_KEY || 'fallback_key_12345_924542'
  );
  return token;
};

const User = mongoose.model<UserType>('User', schema);
export default User;
