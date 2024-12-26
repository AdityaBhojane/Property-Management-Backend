
import { Request, Response } from 'express';
import { getMessageService } from '../service/messageService';
// import { Types } from 'mongoose';



export const getMessagesController = async (req: Request, res: Response) => {
  try {
    // const participantId = new Types.ObjectId(req.params.participantId);
    // const userId = new Types.ObjectId(req.params.recipientId);
    const participantId = req.params.participantId;
    const userId = req.user.id;
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const messagesData = await getMessageService(participantId, userId, page, limit); 
     res.status(200).json({
      success: true,
      data: messagesData,
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
     res.status(500).json({
      success: false,
      message: 'Failed to retrieve messages',
    });
  }
};
