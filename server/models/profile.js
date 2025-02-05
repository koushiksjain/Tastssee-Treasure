const mongoose = require("mongoose");

const profile_photoSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  photo: { type: String },
});

module.exports = mongoose.model("profile_photo", profile_photoSchema);
