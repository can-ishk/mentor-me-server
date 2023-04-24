import { Schema, Types, model } from "mongoose";
import filter from "../utils/profanity";
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
    projectTags: {
      type: [String],
    },
    tags: {
      type: [String],
    },
    type: {
      type: String,
    }
  },
  { timestamps: true }
);

MentSchema.pre("save", function (next) {
  if (this.title.length > 0) {
    this.title = filter.clean(this.title);
  }

  if (this.content.length > 0) {
    this.content = filter.clean(this.content);
  }

  next();
});


MentSchema.index({ title: "text", tags: "text", content: "text", projectTags: "text", type: "text" })

export default model("ment", MentSchema);