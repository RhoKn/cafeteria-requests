const express = require('express');
const usersController = require('../controllers/usersController');
const midlwrAuth = require('../middlewares/authentication');
const mongoose = require('mongoose');
const jwt=require('jsonwebtoken');



const verifyToken=(req, res, next)=>{
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')
  }
  req.userId = payload.subject
  next()
}


var api = express.Router();

api.get('/',usersController.list);
api.get('/all/:page?/:order?',usersController.listAll);
api.get('/view/:id',usersController.viewUser);
api.post('/register',usersController.registerUser);
api.post('/login',usersController.loginUser);
api.put('/update/:id',usersController.updateUser);
api.delete('/delete/:id',usersController.deleteUser);

module.exports = api;
