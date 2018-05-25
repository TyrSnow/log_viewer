import { Document } from 'mongoose';

declare namespace BaseModel {
  interface Model {
    createdAt: Date
    updatedAt: Date
  }
}