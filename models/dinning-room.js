const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var dRoomSchema = new Schema({
    user        :   {type: Schema.ObjectId, ref: 'User'},
    dRoom       :   String,
    description :   String
});

//productSchema.methods.name = function(){}

module.exports = mongoose.model('DRoom',dRoomSchema);