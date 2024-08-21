import express from 'express';
import * as ChatController from '../Controller/ChatController.js'


const router = express.Router();

router.post('/report-word', ChatController.AddOffensiveWord);

export default router;