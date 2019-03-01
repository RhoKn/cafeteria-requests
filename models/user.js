'use strict'

const mongoose = require('mogoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    user_type   :   String,
    name        :   String,
    last_name   :   String,
    user_name   :   String,
    password    :   String,
    email       :   String,
    image       :   String
});

userSchema.methods.fullName = function(){
    return `${this.name} ${this.lastName}`;
}

module.exports = mongoose.model('User',userSchema);
