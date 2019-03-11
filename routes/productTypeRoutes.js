const express = require('express');
const productTypeController = require('../controllers/productTypeController');
var api = express.Router();

api.get('/all/:page?',productTypeController.viewAll);
api.get('/view/:id',productTypeController.viewType);
api.post('/create',productTypeController.createType);
api.put('/update/:id',productTypeController.updateType);
api.delete('/delete/:id',productTypeController.deleteType);


module.exports = api;