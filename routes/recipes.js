var express = require('express');
var router = express.Router();
const dishController = require('../controllers/dishes')
/* GET users listing. */
// /movies/new
router.get('/', dishController.index);
router.get('/new', dishController.new);
// /movies
router.get('/:id', dishController.show);
router.post('/', dishController.create);

module.exports = router;