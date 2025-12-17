import dotenv from 'dotenv';
import path from 'path';
import mongoose from "mongoose";
import  fs from 'fs';

// This points to the root of your project automatically
const ENV_PATH = path.resolve(process.cwd(), '.env');
dotenv.config({ path: ENV_PATH });

export function getContainerEnv() {
    if (!fs.existsSync(ENV_PATH)) return [];
    
    // We use dotenv.parse to get the object without affecting process.env again
    const config = dotenv.parse(fs.readFileSync(ENV_PATH));
    return Object.entries(config).map(([k, v]) => `${k}=${v}`);
}

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/agentDB");

        console.log("MongoDB Connected Successfully");
    } catch (err) {
        console.error("MongoDB Connection Error:", err.message);
        process.exit(1);
    }
};

export default connectDB;