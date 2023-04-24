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
        maxLength: [80, "<40"],
      },
      content: {
        type: String,
        required: true,
        maxLength: [2000, "<500"],
      },
      edited: {
        type: Boolean,
        default: false,
      },
      projectTags:{
        type: [String],
      },
      tags: {
        type: [String],
      },
      type:{
        type: String,
      }
    },
    { timestamps: true }
  );


export default model("ment", MentSchema);