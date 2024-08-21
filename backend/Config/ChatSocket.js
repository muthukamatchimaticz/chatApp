import { Server } from 'socket.io';
// import { saveMessage } from '../Controller/ChatController.js'; // Ensure this path is correct

import { loadBadWords, filterMessage } from './wordFilter.js';

let socketIO;

let badWords = new Set();

const initialize = async () => {
    try {
        badWords = await loadBadWords();
        console.log('Bad words loaded successfully:', Array.from(badWords)); // Debug output
    } catch (error) {
        console.error('Error loading bad words:', error);
    }
};



export const createSocketIO = (server) => {
    socketIO = new Server(server, {
        cors: {
            origin: "*"
        }
    });

    socketIO.on("connection", (socket) => {
        console.log("🚀 Someone connected!");
        console.log("Socket ID:", socket.id);

        socket.on('SENDCHAT', async (messageData) => {

            await initialize();
            
            console.log("messageData", messageData);

            const msgObj = {
                from: messageData.from,
                to: messageData.to,
                message: filterMessage(messageData.message, badWords)
            };

            try {
                // const savedMessage = await saveMessage(msgObj);
                // socket.emit("NEWCHAT", savedMessage, messageData.roomId); // Emit to the room ID

                socketEmit("NEWCHAT", msgObj, messageData.roomId); // Emit to the room ID
                
            } catch (error) {
                console.error("Error in saving message or emitting:", error);
            }
        });

        socket.on("JOINROOM", (roomdata) => {
            console.log(`User ${socket.id} joining room ${roomdata}`);
            socket.join(roomdata?.toString());
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });
};

const socketEmit = (type, message, roomId) => {
    try {
        console.log(`Emitting ${type} event to room ${roomId} with message:`, message);
        socketIO.to(roomId.toString()).emit(type, message); // Emit to the room ID
    } catch (error) {
        console.log("Error on socket emit", error);
    }
};
