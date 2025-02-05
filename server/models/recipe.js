const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  user_id: { type: String,required: true  },
  title: { type: String, required: true },
  ingredients: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String },
});

module.exports = mongoose.model("Recipe", recipeSchema);
