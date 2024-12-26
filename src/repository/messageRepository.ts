import Message from "../models/messageSchema";
import crudRepository from "./crudRepository";


export const messageRepository = {
    ...crudRepository(Message),
    getUniqueUserIds: async () => {
        try {
          const uniqueUserIds = await Message.aggregate([
            {
              $group: {
                _id: '$userId', // Group by userId
              },
            },
            {
              $project: {
                _id: 1, // Keep only the userId in the result
              },
            },
          ]);
      
          // Transform `_id` back to `userId` if needed
          return uniqueUserIds.map(item => item._id);
        } catch (error) {
          console.error('Error fetching unique user IDs:', error);
          throw error;
        }
      }
}