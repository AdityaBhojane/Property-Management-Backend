import { Types } from "mongoose"
import { chatRepository } from "../repository/chatRepository"
import ErrorHelper from "../utils/ErrorHelper";
import { StatusCodes } from "http-status-codes";
import Chat from "../models/chatSchema";


export const CreateChatService = async (userId: Types.ObjectId, participantId: Types.ObjectId) => {
    try {
        if (!participantId) {
            throw Error('Participant ID is required');
        }
    
        const isChatExist = await Chat.findOne({ userId });
        
        if (isChatExist) {
            const isParticipantsExist = isChatExist.participants.some(
                (p) => p.participantsId.toString() === participantId.toString()
            );
    
            if (isParticipantsExist) {
                throw new ErrorHelper('Participants already Exist', StatusCodes.FORBIDDEN, "already exits");
            } else {
                isChatExist.participants.push({ participantsId: participantId });
                await isChatExist.save();
            }
    
            return isChatExist;
        }
        const response = await chatRepository.createChat(userId, participantId);
        return response;
    } catch (error) {
        console.log("error in create chat object ", error);
        throw new ErrorHelper('error in create chat service', StatusCodes.BAD_REQUEST, error);
    }
}

export const findChatByIdService = async (userId: Types.ObjectId) => {
    try {
        const response = await chatRepository.findChatById(userId);
        if (!response) {
            return []
        }
        return response;
    } catch (error) {
        console.log("error find chat object ", error);
        throw new ErrorHelper('error to find chat service', StatusCodes.BAD_REQUEST, error);
    }
}