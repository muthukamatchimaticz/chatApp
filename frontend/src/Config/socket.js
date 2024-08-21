import io from 'socket.io-client';

const API_URL = process.env.REACT_APP_URL;

const URL = "http://localhost:2000/";

console.log("api", API_URL);

export const socket = io(API_URL);

socket.on('connect', function() {

});


export const SendChatMessage = (data) => {
    socket.emit('SENDCHAT', data);
}

export const JoinRoom = (data) => {
    socket.emit("JOINROOM", data)
}