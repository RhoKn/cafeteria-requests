const express = require('express');
const unitsController = require('../controllers/unitsController');
const midlwrAuth = require('../middlewares/authentication');
var api = express.Router();

api.get('/all/:page?/:order?',unitsController.listAll);
api.get('/view/:id',unitsController.viewUnit);
api.post('/create',unitsController.createUnit);
api.put('/update/:id',unitsController.updateUnit);
api.delete('/delete/:id',unitsController.deleteUnit);

module.exports = api;