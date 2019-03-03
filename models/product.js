const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = new Schema({
    name        :   String,
    description :   String
});

//productSchema.methods.name = function(){}

module.exports = mongoose.model('Product',productSchema);