import mongoose from 'mongoose';

const chattingSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true
    },
   
    message: {
        type: [Object],
        required: []
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export default mongoose.model('Chatting', chattingSchema);
