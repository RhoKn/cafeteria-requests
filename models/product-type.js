const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productTypeSchema = new Schema({
    type        :   String
});

//productSchema.methods.name = function(){}

module.exports = mongoose.model('ProductType',productTypeSchema);