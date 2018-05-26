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
      type: String,
      required: true,
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

// tslint:disable-next-line:variable-name
const User = mongoose.model<UserModel.User>('User', model);
export default User;
