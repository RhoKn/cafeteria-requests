const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var deliverySchema = new Schema({
      bus: {type: Schema.ObjectId, ref: 'Bus'},
      request: [
        {type: Schema.ObjectId, ref: 'Request'}
      ] ,
      status:String,
      readyFD:{
              user: String,
              date:String
      },
      // delivering:{
      //   user: String,
      //   date:String
      // },
      // received:{
      //   user: String,
      //   date:String
      // },
      delivery:[
              {dRoom:{type: Schema.ObjectId, ref: 'DRoom'},
              products:[{}]},
            ]
});

module.exports = mongoose.model('Delivery',deliverySchema);
