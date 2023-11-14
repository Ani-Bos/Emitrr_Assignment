import mongoose from "mongoose";
const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: false },
    isadmin: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      required: true,
      //    ,unique:true
    },
    name: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    phone: {
      type: Number,
      default: 0,
    },
    address: {
      type: String,
      default: "",
    },
    score: {
      type: Object,
      default: {
        English: { Easy: 0, Medium: 0, Hard: 0 },
        Spanish: { Easy: 0, Medium: 0, Hard: 0 },
        Hindi: { Easy: 0, Medium: 0, Hard: 0 },
        French: { Easy: 0, Medium: 0, Hard: 0 },
        Bengali: { Easy: 0, Medium: 0, Hard: 0 },
      },
    },
    gameplayed: {
      type: Object,
      default: {
        English: { Easy: 0, Medium: 0, Hard: 0 },
        Spanish: { Easy: 0, Medium: 0, Hard: 0 },
        Hindi: { Easy: 0, Medium: 0, Hard: 0 },
        French: { Easy: 0, Medium: 0, Hard: 0 },
        Bengali: { Easy: 0, Medium: 0, Hard: 0 },
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", UserSchema);
export default User;
