const Dish = require('../models/dish')

// import our Model object which can perform crud operations
// on the movies collection in our mongodb database

module.exports = {
	new: newDish, 
	create,
	index,
	show
}

function show(req, res) {
	Dish.findById(req.params.id, function(err, dish) {
	  res.render('recipes/show', { title: 'Dish Detail', dish });
	});
  }
  

function index(req, res){
	// List out the movies
	Dish.find({}, function(err, allDishes){
		console.log(allDishes, " <- all the dishes");
		if(err){
			res.send('Dish is not good')
		}

		// response should be inside the callback, 
		// because this is after we got a response from the db that we 
		// found all the movies
		res.render('dishes/index.ejs', {
			dish: allDishes
		});// end of render
	});

	
}

function newDish(req, res){
	res.render('dishes/new.ejs')
}

function create(req, res){
	// log out what the function needs
	console.log(req.body)
	// take teh contents of the form (req.body), and add it to our database

	Dish.create(req.body, function(err, dishesDatabase){
		if(err){
			console.log(err, ' <- err in the movies create controller')
			return res.render('dishes/new.ejs')
		}

		console.log(dishesDatabase, ' <- movie created in db')
		//normally redirect, but for testing 
		// the response is always inside of the callback of the Movie model crud operation
		// because we want to confirm with the database our action before we respond to the client
		// aka the browser
		res.redirect('/recipes')
	})
}