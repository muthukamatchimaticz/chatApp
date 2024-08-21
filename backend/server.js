import cors from "cors";
import mongoose from "mongoose";
import express from 'express';
import http from "http";
import chatRoute from "./Routes/chatRoute.js"; // Ensure this path is correct
import { connectDB } from "./Database/database.js"; // Ensure this path is correct
import { createSocketIO } from "./Config/ChatSocket.js"; // Ensure this path is correct

const app = express();
const port = 2000;

app.use(express.json());
app.use(cors());

// Use routes
app.use("/chatting", chatRoute);

const server = http.createServer(app);

// Initialize database and socket.io
const startServer = async () => {
    try {
        await connectDB(); // Ensure this function connects to your MongoDB
        createSocketIO(server);
        server.listen(port, () => {
            console.log("Server is Running on Port: ", port);
        });
    } catch (error) {
        console.error("Error starting the server:", error);
    }
};

startServer();
