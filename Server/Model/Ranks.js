import mongoose from "mongoose";
import User from "./User.js";
const RankSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
        language_id: {
            type: String,
            required: true
        },
        score: {
            type: Number,
            required: true
        },
        accuracy: {
            type: Number,
            required: true
        },
  },
  { timestamps: true }
);

const Rank = mongoose.model("Rank", RankSchema);
export default Rank;
