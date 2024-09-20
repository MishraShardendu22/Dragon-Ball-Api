import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbConnect = async () : Promise<void> => {
    try {
        const Mongo_URI = process.env.MONGO_URI;
        if (!Mongo_URI) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }
        await mongoose.connect(Mongo_URI);
        console.log('Database connected successfully!');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
}

export default dbConnect;