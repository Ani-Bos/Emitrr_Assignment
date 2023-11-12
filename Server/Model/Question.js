import mongoose from "mongoose";
const QuestionSchema = mongoose.Schema(
  {
    languageId: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    correctAnswer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Question = mongoose.model("Question", QuestionSchema);
export default Question;