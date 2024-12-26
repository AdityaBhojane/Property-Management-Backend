import Message, { IMessage } from "../models/messageSchema";
import { messageRepository } from "../repository/messageRepository";
// import { Types } from 'mongoose';


export const getMessageService = async (
  participantId: string, 
  userId: string, 
  // participantId: Types.ObjectId, 
  // userId: Types.ObjectId, 
  page: number = 1, 
  limit: number = 10
) => {
  try {
    console.log(userId)
    const messageParams = {
      $or: [
        { participantId: participantId, userId: userId },
        { participantId: userId, userId: participantId }, 
      ]
    };
    console.log(messageParams)
    const messages = await Message.find(messageParams)
      .sort({ createdAt: -1 }) 
      .skip((page - 1) * limit) 
      .limit(limit)
      .populate('participantId', 'username email');

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



export const getMessagesListService = async (message: Partial<IMessage>) => {
   try {
     const newMessage = await messageRepository.getUniqueUserIds();
     return newMessage;
   } catch (error) {
    throw new Error("failed to create message")
   }
};


export const createMessageService = async (message: Partial<IMessage>) => {
   try {
     const newMessage = await messageRepository.create(message);
     return newMessage;
   } catch (error) {
    console.log("create Message Service error ", error)
    throw new Error("failed to create message")
   }
};