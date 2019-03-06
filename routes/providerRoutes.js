const express = require('express');
const providersController = require('../controllers/providersController');
var api = express.Router();

api.get('/all/:page?/:order?',providersController.listAll);
api.get('/view/:id',providersController.viewUser);
api.post('/create',providersController.createProvider);
api.put('/update/:id',providersController.updateProvider);
api.delete('/delete/:id',providersController.deleteProvider);

module.exports = api;