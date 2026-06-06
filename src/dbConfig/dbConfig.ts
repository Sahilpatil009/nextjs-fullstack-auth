import mongoose from "mongoose";

export async function connect() {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not configured");
        }

        await mongoose.connect(process.env.MONGO_URI);

        const connection = mongoose.connection;

        connection.once("connected", () => {
            console.log("MongoDB connected successfully");
        });

        connection.on("error", (err) => {
            console.error(
                "MongoDB connection error. Please make sure MongoDB is running. " + err
            );
        });
    } catch (error) {
        console.error("MongoDB connection failed");
        throw error;
    }
}
