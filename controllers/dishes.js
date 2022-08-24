const Dish = require("../models/dish");

module.exports = {
  new: newDish,
  create,
  index,
  show,
  dishEdit
};

async function show(req, res) {
   
  try {
    const dishDocument = await Dish.findById(req.params.id)
    
    res.render("dishes/show", {
      title: "Dish Detail",
      dish: dishDocument
    });
  } catch(err){
    res.send(err);
  }
}

function index(req, res) {
  Dish.find({}, function (err, recipeDatabase) {
    //console.log(recipeDatabase);
    res.render("dishes/index.ejs", {
      dishes: recipeDatabase,
    });
  });
}


function newDish(req, res) {
  res.render("dishes/new.ejs");
}

function dishEdit(req, res) {
  //console.log(req.params.id, "<- req.params.id")
  //console.log(req.body, '<- req.body')
  Dish.findOneAndUpdate({ _id: req.params.id }, req.body, function (err){
    if (err) {
      res.send(err);
      console.log(err);
    }
    res.redirect("/dishes");
  })
}
   
function create(req, res) {
  //console.log(req.body);
  req.body.nowShowing = !!req.body.nowShowing; 

  Dish.create(req.body, function (err, recipeDatabase) {
    if (err) {
      console.log(err);
      return res.render("dishes/new.ejs");
    }
    //console.log(recipeDatabase);
    res.redirect(`/dishes/${recipeDatabase._id}`);
  });
}
