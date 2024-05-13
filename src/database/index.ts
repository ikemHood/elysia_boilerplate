import mongoose from 'mongoose';
import Users from './models/users';
import config from '../config';

export default async function ConnectDB() {
  try {
    const conn = await mongoose.connect(config.db.mongodb, { autoIndex: true });
    mongoose.set('strictQuery', false);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log('Info: MongoDB connection successful:', conn.connection.name);
  } catch (err) {
    console.log('Error: Failed to connect MongoDB:', err);
  }
}

export const db = {
  Users
};
