const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    content: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}, //< - we want to make sure a review is always tied to a user
    userName: String,
    userAvatar: String
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
  cast: [{type: mongoose.Schema.Types.ObjectId, ref: 'Performer'}]
});

module.exports = mongoose.model("Dish", dishSchema);
