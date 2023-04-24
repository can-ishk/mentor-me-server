import { Schema, Types, model } from "mongoose";
import * as validator from "validator";
import filter from "../utils/profanity.js";

const UserSchema = new Schema(
  { 
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: [6, "Username must be at least 6 characters long"],
    },
    name: {
      type: String,
      required: true,
      minlength: [6, "Username must be at least 6 characters long"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.default.isEmail, "Invalid Emails"],
    },
    biography: {type: String, maxLength: [60, "Too Long"]},
    avatar: String,
    password: { type: String, required: true },
    tags: [String],
    dept: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  if (filter.isProfane(this.username)) {
    throw new Error("username cannot contain profanity.");
  }

  if (this.biography && this.biography.length > 0) {
    this.biography = filter.clean(this.biography);
  }

  next();
});

export default model("user", UserSchema);
