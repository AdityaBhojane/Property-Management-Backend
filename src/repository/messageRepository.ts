import Message from "../models/messageSchema";
import crudRepository from "./crudRepository";


export const messageRepository = {
    ...crudRepository(Message)
}