import mongoose from 'mongoose';

export const connect = () => {
    return mongoose.connect(process.env.MONGODB_URI, {dbName: process.env.DB_NAME});
}