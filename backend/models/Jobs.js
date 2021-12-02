const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let schema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  maxApps: {
    type: Number,
    required: true,
  },
  numApps: {
    type: Number,
    required: true,
    default: 0,
  },
  maxPos: {
    type: Number,
    required: true,
  },
  numAccepted: {
    type: Number,
    required: true,
    default: 0,
  },
  postingDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  deadlineDate: {
    type: Date,
    required: true,
  },
  requiredSkills: [String],
  description:{
    type: String,
  },
  companyURL:{
    type: String
  },
  companyName:{
    type: String,
  },
  department:{
    type: String
  },
  location:{
    type: String
  },
  experience:{
    type: String
  },
  salary: {
    type: Number,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  

  // Recruiter: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Recruiter",
  // },
  
  user: {
    id: { type: Schema.Types.ObjectId, ref: "Recruiter"},
    username: { type: String },
    email: { type: String },
  },
});

module.exports = mongoose.model("Job", schema);
