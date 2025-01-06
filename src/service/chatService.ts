import { Types } from "mongoose"
import { chatRepository } from "../repository/chatRepository"
import ErrorHelper from "../utils/ErrorHelper";
import { StatusCodes } from "http-status-codes";
import Chat from "../models/chatSchema";
import adminChat from "../models/adminChatSchema";


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

        const createAdminChat = await CreateAdminChatService(participantId,userId);
        if(!createAdminChat){
            throw Error('something is wrong with create admin chat');
        }
        return response;
    } catch (error) {
        console.log("error in create chat object ", error);
        throw new ErrorHelper('error in create chat service', StatusCodes.BAD_REQUEST, error);
    }
};


export const CreateAdminChatService = async (userId: Types.ObjectId, participantId: Types.ObjectId) => {
    try {
        if (!participantId) {
            throw Error('Participant ID is required');
        }
    
        const isChatExist = await adminChat.findOne({ userId });
        
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
        const response = await chatRepository.createAdminChat(userId, participantId);
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


export const findAdminChatByIdService = async (userId: Types.ObjectId) => {
    try {
        const response = await chatRepository.findAdminChatById(userId);
        if (!response) {
            return []
        }
        return response;
    } catch (error) {
        console.log("error find chat object ", error);
        throw new ErrorHelper('error to find chat service', StatusCodes.BAD_REQUEST, error);
    }
}

