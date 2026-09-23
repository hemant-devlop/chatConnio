import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
     _id:{type:mongoose.Schema.Types.ObjectId,required:true},
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    type: {
      type: String,
      enum: ["direct", "group"],
      default: "direct",
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
    lastMessageAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Conversation = mongoose.model(
  "Conversation",
  conversationSchema
);