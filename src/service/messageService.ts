import Message, { IMessage } from "../models/messageSchema";
import { messageRepository } from "../repository/messageRepository";
import { Types } from 'mongoose';


export const getMessageService = async (
  senderId: string, 
  userId: string, 
//   senderId: Types.ObjectId, 
//   userId: Types.ObjectId, 
  page: number = 1, 
  limit: number = 10
) => {
  try {
    const messageParams = {
      $or: [
        { senderId: senderId, userId: userId },
        { senderId: userId, userId: senderId },
      ]
    };

    console.log(messageParams)

    const messages = await Message.find(messageParams)
      .sort({ createdAt: -1 }) 
      .skip((page - 1) * limit) 
      .limit(limit)
      .populate('senderId', 'username email');

      console.log("MSG",messages)

    const totalMessages = await Message.countDocuments(messageParams);
    const totalPages = Math.ceil(totalMessages / limit);

    return {
      messages,
      totalMessages,
      totalPages,
      currentPage: page,
      limit,
    };
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw new Error("Failed to retrieve messages");
  }
};



export const createMessageService = async (message: Partial<IMessage>) => {
    const newMessage = await messageRepository.create(message);
    return newMessage;
  };