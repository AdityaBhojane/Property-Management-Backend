import mongoose, { model, Schema, Types } from "mongoose";

interface IChat {
    userId: Types.ObjectId,
    participants: { participantsId: Types.ObjectId }[]
}

const chatSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'user id is required']
    },
    participants: [
        {
            participantsId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        }
    ]
});

const Chat = model<IChat>("Chat", chatSchema);
export default Chat    