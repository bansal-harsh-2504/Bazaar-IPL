import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    iplTeam: { type: String, default: "RCB" },
  },
  { minimize: false, timestamps: true }
);

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
