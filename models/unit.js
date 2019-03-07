const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var unitSchema = new Schema({
    name           :   String
});

module.exports = mongoose.model('Unit',unitSchema);
