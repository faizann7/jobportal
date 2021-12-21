const mongoose = require("mongoose");

let schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  skills: [String],
  education: [
    {
      instituteName: {
        type: String,
        required: true,
      },
      startYear: {
        type: String,
        required: true,
      },
      endYear: String,
    },
  ],
  contactNumber: {
    type: String,
  },
  isRecruiter: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Applicant", schema);
