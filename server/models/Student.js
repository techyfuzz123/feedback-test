const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    regNo: { type: Number, required: true, trim: true, unique: true },
    dob: { type: String, required: true, trim: true },
    batch: { type: Number, required: true, trim: true },
    degree: { type: String, required: true, trim: true },
    section: { type: String, required: true, trim: true },
    password: { type: String },
    isFeedbackSubmitted: {
      I: {
        I: { type: Boolean, default: false },
        II: { type: Boolean, default: false },
      },
      II: {
        I: { type: Boolean, default: false },
        II: { type: Boolean, default: false },
      },
      III: {
        I: { type: Boolean, default: false },
        II: { type: Boolean, default: false },
      },
      IV: {
        I: { type: Boolean, default: false },
        II: { type: Boolean, default: false },
      },
      V: {
        I: { type: Boolean, default: false },
        II: { type: Boolean, default: false },
      },
      VI: {
        I: { type: Boolean, default: false },
        II: { type: Boolean, default: false },
      },
      VII: {
        I: { type: Boolean, default: false },
        II: { type: Boolean, default: false },
      },
      VIII: {
        I: { type: Boolean, default: false },
        II: { type: Boolean, default: false },
      },
    },
    feedbacks: [
      {
        semester: { type: String, required: true },
        feedbackNo: { type: String, required: true },
        isSubmitted: { type: Boolean, default: false },
      },
      { _id: false },
    ],
    subjects: {
      include: [
        {
          subjectCode: { type: String, required: true },
          subjectName: { type: String, required: true },
          faculty: { type: String, required: true },
        },
        { _id: false },
      ],
      exclude: [
        {
          subjectCode: { type: String, required: true },
          subjectName: { type: String, required: true },
          faculty: { type: String, required: true },
        },
      ],
    },
  },
  { versionKey: false }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = { Student };
