import { userRepository } from "../repository/userRespository"



export const getUserService = async (id:string) =>{
    try {
        return await userRepository.get(id);
    } catch (error) {
        console.log('error in get user service - ', error);
        throw error
    }
};

export const updateUserService = async (id:string,data:{username?: string, city?:string, phone?:string, images?:string}) =>{
    try {
        return await userRepository.update(id,data)
    } catch (error) {
        console.log('error in update user - ', error);
        throw error
    }
};

export const deleteUserService = async (id:string)=>{
    try {
        return await userRepository.delete(id)
    } catch (error) {
        console.log('error in delete user - ', error);
        throw error
    }
};

export const getAgentService  = async ()=>{
    try {
        return await userRepository.getAgent();
    } catch (error) {
        console.log('error in get agent service - ', error);
        throw error
    }
}