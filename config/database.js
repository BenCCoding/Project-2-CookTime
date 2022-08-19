const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dishes');

mongoose.connection.on('connected', function(){
	console.log(`Connected to Mongodb, Good Luck!`)
})