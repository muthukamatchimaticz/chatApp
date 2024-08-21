import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// import User from '../Model/user.'; // Ensure the correct path and file extension

import Chatting from '../Model/chatting.js';
import { appendWordToCSV } from '../Config/wordFilter.js';

const secretKey = "Muthu_Maticz";

export const userLogin = async (req, res) => {
    let { email, password } = req.body;

    const result = await User.findOne({ email }); // Use findOne instead of find

    if (result) {
        const compare = await bcrypt.compare(password, result.hashedPassword);

        if (compare) {
            const payload = { email };
            const token = jwt.sign(payload, secretKey);
            res.status(200).json({ "msg": "Login Successfully", "status": true, "token": token });
        } else {
            res.status(200).json({ "msg": "Incorrect Password", "status": false });
        }
    } else {
        res.status(200).json({ "msg": "User Not Found", "status": false });
    }
}

export const saveMessage = async (messageData) => {
    try {
        console.log("message_123", messageData);

        const roomId = messageData.roomId;

        let payload = {
            from: messageData.from,
            to: messageData.to,
            message: messageData.message,
        };

        let result = ""

        try {
            // Step 1: Check if the document exists
            const existingChat = await Chatting.findOne({ roomId: roomId });

            if (existingChat) {
                // Step 2: Document exists, update it by pushing the new message
                result = await Chatting.updateOne(
                    { roomId: roomId },
                    { $push: { message: payload } }
                );

                if (result.nModified > 0) {
                    console.log('Message successfully added.');
                } else {
                    console.log('No changes made. The message might already exist.');
                }
            } else {
                console.log('No document found with the specified roomId.');
            }
        } catch (error) {
            console.error('Error finding or updating the document:', error);
        }
        return result;



    } catch (error) {
        console.error("Error saving message:", error);
        throw error;
    }
};

export const AddOffensiveWord = async (req, res) => {

    let { offensiveWord, reportMessage } = req?.body;

    console.log("ADD_OFFENSIVE", offensiveWord, reportMessage);

    try {
        const result = await appendWordToCSV(offensiveWord.toLowerCase());

        if (result) {
            res.status(200).json({ status: true, message: 'Reported Successfully' });
        }   
        else
        {
            res.status(200).json({ status: true, message: 'Failed to Report' });
        }
    } catch (error) {
        console.error('Error adding word to CSV:', error);
        return res.status(200).json({ status: false, message: 'Internal server Error' });
    }
}