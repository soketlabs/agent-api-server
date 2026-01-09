import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/agentdb");
        const db = mongoose.connection.db;
        const coll = await db.listCollections().toArray();
        console.log("Collections in agentDB:", coll);

        console.log("MongoDB Connected Successfully");
        return db;
    } catch (err) {
        console.error("MongoDB Connection Error:", err.message);
        process.exit(1);
    }
};



export default connectDB;