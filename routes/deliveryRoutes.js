const express = require('express');
const deliveryController = require('../controllers/deliveryController');
const midlwrAuth = require('../middlewares/authentication');
const mongoose = require('mongoose');
const jwt=require('jsonwebtoken');



var api = express.Router();

api.get('/all/:page?',deliveryController.viewAll);
api.get('/view/:id',deliveryController.viewDelivery);
api.post('/create',deliveryController.createDelivery);
api.put('/update/:id',deliveryController.updateDelivery);
//api.put('/updateStatus/:id',deliveryController.changeStatus);
api.delete('/delete/:id',deliveryController.deleteDelivery);

module.exports = api;
