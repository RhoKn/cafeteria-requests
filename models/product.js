const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = new Schema({
    name        :   String,
    unit        :   [{type: Schema.ObjectId, ref: 'Unit'}],
    category    :   {type: Schema.ObjectId, ref: 'ProductType'},
    provider   :   [{type: Schema.ObjectId, ref: 'Provider'}],
    description :   String,
    price       :   Number
});

//productSchema.methods.name = function(){}

module.exports = mongoose.model('Product',productSchema);
