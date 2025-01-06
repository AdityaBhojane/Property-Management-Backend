import { Types } from "mongoose";
import { createMessageService } from "../service/messageService";


interface Idata {
  body: string;
  userId: Types.ObjectId;
  participantId: Types.ObjectId;
}

export function MessageSocketHandlers(io: any, socket: any) {
  socket.on("SEND_PRIVATE_MESSAGE", async (data: Idata, cb: any) => {
    const { userId, participantId, body } = data;

    // Generate a unique room ID for the two users
    const roomId = [userId, participantId].sort().join("_");

    console.log(`Message from ${userId} to ${participantId} in room ${roomId}:`, body);

    try {
      // Create the message in the database
      const messageResponse = await createMessageService(data);

      // Send the message only to the users in the room
      io.to(roomId).emit("RECEIVE_PRIVATE_MESSAGE", messageResponse);

      // Acknowledge the sender
      cb?.({
        success: true,
        message: "Message sent and saved successfully",
        data: messageResponse,
      });
    } catch (error) {
      console.error("Error creating message:", error);
      cb?.({
        success: false,
        message: "Failed to send message",
      });
    }
  });
}


export function RoomSocketHandlers(io: any, socket: any) {
  //  joining 
  socket.on(
    "JOIN_PRIVATE_CHAT",
    (data: { userAId: string; userBId: string }, cb: any) => {
      const { userAId, userBId } = data;

      // Create a unique room ID for the two users
      const roomId = [userAId, userBId].sort().join("_");

      // Join the room
      socket.join(roomId);
      console.log(`User ${socket.id} joined the private room: ${roomId}`);

      // Acknowledge 
      cb?.({
        success: true,
        message: "Successfully joined the private room",
        roomId,
      });
    }
  );

  // Handle leaving a private chat room
  socket.on("LEAVE_PRIVATE_CHAT", (roomId: string, cb: any) => {
    if (roomId) {
      // Leave the room
      socket.leave(roomId);
      console.log(`User ${socket.id} left the private room: ${roomId}`);

      // Acknowledge the leave event
      cb?.({
        success: true,
        message: `Successfully left the room: ${roomId}`,
      });
    } else {
      cb?.({
        success: false,
        message: "No roomId provided to leave.",
      });
    }
  });
}
