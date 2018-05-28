import { Document } from 'mongoose';
import AUTH_TYPE from '../constants/auth';

declare namespace UserModel {

  interface UserProfile {
    name: string
    head?: string
    email?: string
    phone?: string
  }

  interface UserAuth {
    sault: string
    password: string
    auth: AUTH_TYPE
    block?: boolean
    block_date?: Date
    delete?: boolean
    delete_date?: Date
  }

  interface User extends Document, UserProfile, UserAuth {

  }
}
