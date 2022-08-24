var express = require('express');
var router = express.Router();
const dishController = require('../controllers/dishes');
const isLoggedIn = require('../config/auth')

router.get('/', dishController.index);
router.get('/new', isLoggedIn, dishController.new);
router.get('/:id', dishController.show);
router.put('/:id', dishController.dishEdit);
router.post('/', isLoggedIn, dishController.create);

module.exports = router;