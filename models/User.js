import { Schema, Types, model } from "mongoose";
import * as validator from "validator";
//TODO: add profanity filter
// interface User {
//   name: string;
//   email: string;
//   password: string;
//   avatar?: string;
//   tags: Types.Array<string>;
//   dept: string;
//   isAdmin: boolean;
// }

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
    avatar: String,
    password: { type: String, required: true },
    tags: [String],
    dept: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model("user", UserSchema);
