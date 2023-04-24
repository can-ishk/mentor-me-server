import { Schema, Types, model } from "mongoose";

const MessageSchema = new Schema(
  {
    conversation: {
      type: Types.ObjectId,
      ref: "conversation",
      required: true,
    },
    sender: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("message", MessageSchema);