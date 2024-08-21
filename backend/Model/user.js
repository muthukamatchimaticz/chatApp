import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        default: "",
        required: true
    },
    hashedPassword: {
        type: String,
        default: "",
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);