'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    user_type           :   String,
    first_name          :   String,
    last_name           :   String,
    nick_name           :   String,
    password            :   String,
    email               :   String,
    registration_Date   :   String,
    image               :   String
});

userSchema.methods.fullName = function(){
    return `${this.name} ${this.lastName}`;
}

module.exports = mongoose.model('User',userSchema);
