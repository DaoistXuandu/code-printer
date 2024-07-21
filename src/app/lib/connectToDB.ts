
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import { CONFIG_FILES } from 'next/dist/shared/lib/constants';
const DATABASE_URL = process.env.NEXT_PUBLIC_MONGO_URI as string;

export async function connectToDatabase() {
    try {
        await mongoose.connect(DATABASE_URL)
        console.log("Succes Connecting to Database")
    }
    catch (error) {
        throw new Error("Error Connecting")
    }
}