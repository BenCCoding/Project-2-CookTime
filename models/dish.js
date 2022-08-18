const mongoose = require('mongoose')

// Embed the Reviews in the movies
// One to many relationship
// One Movie has many Reviews, Review belongs to a Movie
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
	name: String, 
	cookTime: String, 
	reviews: [reviewSchema]
});


// Create our model, which will create the collection, 
// and return to us and object that can perform CRUD
// operations on that collection (typically you'll use the model in controller files)
module.exports = mongoose.model('Dish', dishSchema);