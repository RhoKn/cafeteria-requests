const express = require('express');
const productsController = require('../controllers/productsController');
var api = express.Router();

api.get('/all/:page?',productsController.viewAll);
api.get('/search/:param/:criteria',productsController.searchBy);
api.get('/view/:id',productsController.viewProduct);
api.post('/create',productsController.createProduct);
api.put('/update/:id',productsController.updateProduct);
api.delete('/delete/:id',productsController.deleteProduct);


module.exports = api;