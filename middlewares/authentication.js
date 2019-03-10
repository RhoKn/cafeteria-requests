'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = require('../config/config').get(process.env.NODE_ENV == undefined ? "dev" : process.env.NODE_ENV).secretKey;

exports.authentication = function(req,res,next){
  if(!req.headers.authorization) return res.status(406).send({message: 'Loggeate para poder continuar'});
  var token = req.headers.authorization.replace(/['"]+/g,'');
  try{
    var payload = jwt.decode(token, secret);
    if(payload.exp_time <=moment().unix()){
      return responseHelper.helper(undefined,res,401,'Sesión expirada');
    }
  }catch(err){
    return res.status(401).send({message: 'Token no valido'});
  }

  req.user = payload;
  next();
}
