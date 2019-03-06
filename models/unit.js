const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var unitSchema = new Schema({
    name           :   String,
    units          :   Number
});

module.exports = mongoose.model('Unit',unitSchema);
