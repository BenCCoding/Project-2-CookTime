const Dish = require("../models/dish");

module.exports = {
  create,
  delete: deleteReview
};

async function deleteReview(req, res){
  try {
    const recipeDocument = await Dish.findOne({
      'reviews._id': req.params.id,
      'reviews.user': req.user._id
    });
    if(!recipeDocument) return res.redirect('/dish');

    recipeDocument.reviews.remove(req.params.id);

    await recipeDocument.save();
    res.redirect(`/dishes/${recipeDocument._id}`)

  } catch(err){
    res.send(err)
  }
}


function create(req, res) {
  console.log(req.user, " <- this is req.user")
  Dish.findById(req.params.id, function (err, recipeDocument) {
   req.body.user = req.user._id;
   req.body.userName = req.user.name;

   recipeDocument.reviews.push(req.body);
    recipeDocument.save(function(err) {
      res.redirect(`/dishes/${req.params.id}`);
    });
  });
}
