import { Document } from 'mongoose';
import AUTH_TYPE from '../constants/auth';

declare namespace SessionModel {
  interface SessionInfo {
    id: string
    name: string
    auth: AUTH_TYPE
    head?: string
    phone?: string
    email?: string
  }
}
