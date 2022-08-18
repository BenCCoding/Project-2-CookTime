const Dish = require("../models/dish");

module.exports = {
  create,
};

function create(req, res) {
  console.log(req.params.id, " <- params movie id");
  console.log(req.body, " <- the contents of the form aka the review");
  // First we have to find the movie
  Dish.findById(req.params.id, function (err, dishComment) {
    // then we need to add the review (aka req.body) to that movies reviews array
    console.log(dishComment, " <- movieDocument");
    dishComment.reviews.push(req.body); // <- mutating (changing) the document
    // that we found from the database,
    // so when we do that, we need to tell the database we changed something,
    // so we have to save the document
    dishComment.save(function(err) {
      res.redirect(`/dishes/${req.params.id}`);
    });
  });
}