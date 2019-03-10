const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var unitSchema = new Schema({
    name    :   String,
    weigh   :   Number
});

module.exports = mongoose.model('Unit',unitSchema);
