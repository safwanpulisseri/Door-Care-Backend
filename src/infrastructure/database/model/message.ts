
import mongoose, { Document, Model, Schema } from "mongoose";
import { IMessage } from "../../../domain/message";

const messageSchema: Schema = new Schema<IMessage & Document>(
    {
        conversationId: {
          type: String,
        },
        senderId: {
          type: String,
        },
        text: {
          type: String,
        },
        status: { 
          type: Boolean, default: false
         },
      },
      { timestamps: true }
);

const MessageModel: Model<IMessage & Document> = mongoose.model<IMessage & Document>(
  "Message",
  messageSchema
);

export default MessageModel;