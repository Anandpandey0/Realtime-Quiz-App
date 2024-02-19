import mongoose, { Schema, Document, Types } from "mongoose";

interface Option {
  title: string;
  isCorrect: boolean;
}

export interface Question {
  _id: string | null;
  title: string;
  options: Option[];
}

export interface Quiz extends Document {
  owner: Types.ObjectId;
  title: string;
  questions: Question[];
  created_at: Date;
  updated_at: Date;
}

const optionSchema: Schema<Option> = new Schema({
  title: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
});

const questionSchema: Schema<Question> = new Schema({
  title: { type: String, required: true },
  options: { type: [optionSchema], required: true },
});

const quizSchema: Schema<Quiz> = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, default: "Untitled" },
    questions: { type: [questionSchema], default: [] },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { timestamps: false } // Disable Mongoose timestamps
);

const QuizModel = mongoose.model<Quiz>("Quiz", quizSchema);
export default QuizModel;
