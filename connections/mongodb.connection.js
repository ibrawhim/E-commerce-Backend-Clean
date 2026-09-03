const mongoose = require("mongoose");

const URI = process.env.MONGO_URI;

if (!URI) {
    throw new Error("MONGO_URI is not defined.");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null,
    };
}

const connectDB = async () => {
    // Already connected
    if (cached.conn) {
        return cached.conn;
    }

    // Connection is already being established
    if (!cached.promise) {
        cached.promise = mongoose.connect(URI, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
        });
    }

    try {
        cached.conn = await cached.promise;

        console.log("MongoDB Connected");

        return cached.conn;
    } catch (error) {
        cached.promise = null;

        console.error("MongoDB connection error:", error);

        throw error;
    }
};

module.exports = connectDB;