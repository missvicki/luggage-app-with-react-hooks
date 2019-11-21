import mongoose from "mongoose";

const loginSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: { type: String, required: true, minLength: 8 }
});
export const Login = mongoose.model("Login", loginSchema);
