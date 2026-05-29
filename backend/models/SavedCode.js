const mongoose = require("mongoose");

const savedCodeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    default: "",
  },
  folderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("SavedCode", savedCodeSchema);
