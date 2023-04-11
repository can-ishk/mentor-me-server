import { Schema, Types, model } from "mongoose";
//TODO: add profanity filter
const MentSchema = new Schema(
    {
      author: {
        type: Types.ObjectId,
        ref: "user",
        required: true,
      },
      title: {
        type: String,
        required: true,
        maxLength: [40, "<40"],
      },
      content: {
        type: String,
        required: true,
        maxLength: [500, "<500"],
      }
    },
    { timestamps: true }
  );


export default model("ment", MentSchema);