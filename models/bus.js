const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var busSchema = new Schema({
    space_box    :   Number,
    user         :   {type: Schema.ObjectId, ref: 'User'},
    license_plate : String
});

module.exports = mongoose.model('Bus',busSchema);
