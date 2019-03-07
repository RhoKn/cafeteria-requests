const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var requestSchema = new Schema({
    dRoom       :   {type: Schema.ObjectId, ref: 'DRoom'},
    products    :   [{type: Schema.ObjectId, ref: 'Product'}],
    totalPrice  :   Number,
    created_at  :   String,
    status      :   String
});

//productSchema.methods.name = function(){}

module.exports = mongoose.model('Request',requestSchema);