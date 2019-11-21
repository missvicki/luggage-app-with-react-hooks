import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: { type: Number, required: true },
  password: { type: String, required: true, minLength: 8 },
  confirmed: { type: Boolean, default: false },
  admin: { type: Boolean, required: true }
});

// hash the password before the user is added to the database
userSchema.pre("save", async function(next) {
  this.password = await bcrypt.hash(this.password, 8);
  next();
});
export const User = mongoose.model("User", userSchema);
