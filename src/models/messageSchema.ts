import mongoose, { Document, Types } from 'mongoose';

 export interface IMessage extends Document{
    _id: Types.ObjectId;
    body:string;
    userId:Types.ObjectId;
    participantId:Types.ObjectId;
}

const messageSchema = new mongoose.Schema({
  body: {
    type: String,
    required: [true, 'Message body is required']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Channel',
    required: [true, 'Channel ID is required']
  },
  participantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'participant ID is required']
  },
});

const Message = mongoose.model<IMessage>('Message', messageSchema);

export default Message;
