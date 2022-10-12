const mongoose = require("mongoose");

const reportSchema = mongoose.Schema({
  batch: {
    type: Number,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  subjects: [
    {
      subjectCode: {
        type: String,
        required: true,
      },
      subjectName: {
        type: String,
        required: true,
      },
      faculty: {
        type: String,
        required: true,
      },
      totalStrength: {
        type: Number,
        required: true,
      },
      totalResponse: {
        type: Number,
        required: true,
      },
      averageTotal: {
        type: Number,
        required: true,
      },
      fourScaleRating: {
        type: Number,
        required: true,
      },
      report: {
        1: {
          type: Number,
          required: true,
        },
        2: {
          type: Number,
          required: true,
        },
        3: {
          type: Number,
          required: true,
        },
        4: {
          type: Number,
          required: true,
        },
        5: {
          type: Number,
          required: true,
        },
      },
    },
  ],
});

const Report = mongoose.model("Report", reportSchema);

module.exports = { Report };
