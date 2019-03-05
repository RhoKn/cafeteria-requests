'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var providerSchema = new Schema({
    name                :   String,
    contact_first_name  :   String,
    contact_last_name   :   String,
    phone_number        :   Number,
    email               :   String,
    RFC                 :   String,
    postal_code         :   Number,
    street_name         :   String,
    street_number       :   Number,
    suite_number        :   String,
    colony              :   String
});

providerSchema.methods.fullName = function(){
    return `${this.first_name} ${this.last_name}`;
}

providerSchema.methods.fullAdress = function(){
    return `${this.street_name} #${this.street_number} colonia ${this.colony}`;
}

module.exports = mongoose.model('Provider',providerSchema);
