import { Types } from "mongoose"
import Chat from "../models/chatSchema"


export const chatRepository = {
    createChat: async (userId: Types.ObjectId, participantId: Types.ObjectId) => {
        const chat = await Chat.create({ userId, participants: [{ participantsId: participantId }] });
        return chat;
    },
    
    findChatById:async (userId: Types.ObjectId) =>{
        return await Chat.findOne({ userId: userId }).populate("participants.participantsId", "username images");
    }
}