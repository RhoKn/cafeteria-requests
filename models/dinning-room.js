const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var dRoomSchema = new Schema({
    user            :   {type: Schema.ObjectId, ref: 'User'},
    dRoom           :   String,
    description     :   String,
    street          :   String,
    street_number   :   Number,
    suite_number    :   String,
    colony          :   String,
    postal_code     :   Number
});

//productSchema.methods.name = function(){}

module.exports = mongoose.model('DRoom',dRoomSchema);