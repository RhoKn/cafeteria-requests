const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var requestSchema = new Schema({
    dRoom           :   {type: Schema.ObjectId, ref: 'DRoom'},
    observations    :   String,
    AuthObservations    :   String,
    products        :   [{
                            name    :   String,
                            unit    :   String,
                            quantity:   String,
                            provider:   {type: Schema.ObjectId, ref: 'Provider'},
                            category:   String
                        }],
    created         :   {
                            date    :   String,
                            user    :   String
                        },
    status          :   String,
    authorized      :   {
                            date    :   String,
                            user    :   String
                        },
    approved        :   {
                            date    :   String,
                            user    :   String
                        },
    rejected        :   {
                            date    :   String,
                            user    :   String
                        }
});

//productSchema.methods.name = function(){}

module.exports = mongoose.model('Request',requestSchema);
