import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const mongoURI = 'mongodb://localhost:27017/chatapp';

        await mongoose.connect(mongoURI);

        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit the process with a failure code
    }
};
