import { Types } from "mongoose"
import Chat from "../models/chatSchema"
import adminChat from "../models/adminChatSchema";


export const chatRepository = {
    createChat: async (userId: Types.ObjectId, participantId: Types.ObjectId) => {
        const chat = await Chat.create({ userId, participants: [{ participantsId: participantId }] });
        return chat;
    },
    createAdminChat: async (userId: Types.ObjectId, participantId: Types.ObjectId) => {
        const chat = await adminChat.create({ userId, participants: [{ participantsId: participantId }] });
        return chat;
    },
    findChatById:async (userId: Types.ObjectId) =>{
        return await Chat.findOne({ userId: userId }).populate("participants.participantsId", "username images");
    },
    findAdminChatById:async (userId: Types.ObjectId) =>{
        return await adminChat.findOne({ userId }).populate("participants.participantsId", "username images");
    },
}