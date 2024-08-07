import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

export const userModel = mongoose.model("userModel", userSchema, "users");
