import { Schema, model } from "mongoose";

const userMessageModel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserMessage = model("UserMessage", userMessageModel);

export default UserMessage;
