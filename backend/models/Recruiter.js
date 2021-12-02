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
  contactNumber: {
    type: String,
    required: true,
  },
  companyURL: {
    type: String,
  },
  companyDescription: {
    type: String,
    maxlength: 1000,
  },
  location: {
    type: String,
  },
  isRecruiter: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Recruiter", schema);
