import * as mongoose from 'mongoose';
import { UserModel } from './User';
import AUTH_TYPE from '../constants/auth';

const Schema = mongoose.Schema;

const model = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    email: String,
    phone: String,
    head: String,
    auth: {
      type: Number,
      enum: AUTH_TYPE,
      default: AUTH_TYPE.USER,
    },
    sault: {
      type: String,
      required: true,
    },
    password: {
      name: {
        type: String,
        required: true,
      },
      email: String,
      phone: String,
    },
    block: Boolean,
    block_date: Date,
    delete: Boolean,
    delete_date: Date,
  },
  {
    timestamps: true,
  },
);

const user = mongoose.model<UserModel.User>('User', model);
export default user;
