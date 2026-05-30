import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["Admin", "Developer", "Viewer"],
    default: "Viewer",
  },
  status: {
    type: String,
    enum: ["Active", "Pending", "Suspended"],
    default: "Active",
  },
}, { timestamps: true })


export default mongoose.model("User", userSchema)
