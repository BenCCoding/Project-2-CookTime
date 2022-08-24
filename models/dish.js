const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    content: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    userName: String,
  },
  {
    timestamps: true,
  }
);

const dishSchema = new mongoose.Schema({
  dishName: {
    type: String,
  },
  cookingTime: {
    type: String,
  },
  reviews: [reviewSchema],
});

module.exports = mongoose.model("Dish", dishSchema);
