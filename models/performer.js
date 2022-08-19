const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const performerSchema = new Schema({});

module.exports = mongoose.model('Performer', performerSchema);