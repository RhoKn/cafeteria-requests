const express = require('express');
const unitsController = require('../controllers/busController');
const midlwrAuth = require('../middlewares/authentication');
var api = express.Router();

api.get('/all/:page?/:order?',unitsController.listAll);
api.get('/view/:id',unitsController.viewBus);
api.post('/create',unitsController.createBus);
api.put('/update/:id',unitsController.updateBus);
api.delete('/delete/:id',unitsController.deleteBus);

module.exports = api;
