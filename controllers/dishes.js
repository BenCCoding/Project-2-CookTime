const Dish = require("../models/dish");
const Performer = require("../models/performer");
// import our Model object which can perform crud operations
// on the movies collection in our mongodb database

module.exports = {
  new: newDish,
  create,
  index,
  show,
};

async function show(req, res) {
   
  try {
    const dishDocument = await Dish.findById(req.params.id).populate("cast").exec()
    const performers = await Performer.find(
        { _id: { 
         $nin: dishDocument.cast
         } 
        }); 
    
    res.render("dishes/show", {
      title: "Dish Detail",
      dish: dishDocument,
      performers: performers, 
    });
  } catch(err){
    res.send(err);
  }
}

function index(req, res) {
  Dish.find({}, function (err, recipeDatabase) {
    console.log(recipeDatabase, " <- all the movies");

    res.render("dishes/index.ejs", {
      dishes: recipeDatabase,
    });
  });
}

function newDish(req, res) {
  res.render("dishes/new.ejs");
}

function create(req, res) {
  console.log(req.body);

  req.body.nowShowing = !!req.body.nowShowing; 

  Dish.create(req.body, function (err, recipeDatabase) {
    if (err) {
      console.log(err);
      return res.render("dishes/new.ejs");
    }

    console.log(recipeDatabase);
    res.redirect(`/dishes/${recipeDatabase._id}`);
  });
}
