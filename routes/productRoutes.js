const express = require('express');
const productsController = require('../controllers/productsController');
var api = express.Router();

api.get('/',productsController.test);
api.get('/all',productsController.viewAll);
api.get('/view/:id',productsController.viewProduct);
api.post('/create',productsController.createProduct);
api.put('/udate/:id',productsController.updateProduct);
api.delete('/delete/:id',productsController.deleteProduct);


module.exports = api;