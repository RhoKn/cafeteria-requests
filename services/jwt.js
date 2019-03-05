'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = require('../config/config').get(process.env.NODE_ENV == undefined ? "dev" : process.env.NODE_ENV).secretKey;

exports.createToken = function(user){
  var payLoad = {
    sub             : user._id,
    user_type       : user.user_type,
    first_name      : user.first_name,
    last_name       : user.last_name,
    nick_name       : user.nick_name,
    email           : user.email,
    email           : user.email,
    image           : user.image,
    creation_time   : moment().unix(),
    exp_time        : moment().add(30,'days').unix()
  };
  return jwt.encode(payLoad, secret);
}
