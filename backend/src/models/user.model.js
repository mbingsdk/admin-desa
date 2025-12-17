import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
    wilayah: {
      desa: { type: String },
      dusun: { type: String },
      rw: { type: String },
      rt: { type: String }
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
