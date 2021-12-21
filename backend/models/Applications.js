const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let schema = new mongoose.Schema({
  jobId: {
    type: Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  user: {
    id: { type: Schema.Types.ObjectId, ref: "Applicant" },
    username: { type: String },
    email: { type: String },
  },
  applicantId: {
    type: Schema.Types.ObjectId,
    ref: "Applicant",
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Applied",
  },
  appDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  closeDate: {
    type: Date,
    default: () => Date.now() + 2 * 365 * 24 * 3600 * 1000,
  },
  coverLetter: {
    type: String,
    default: "",
  },
  resume: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Application", schema);
