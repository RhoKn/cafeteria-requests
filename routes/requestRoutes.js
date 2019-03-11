const express = require('express');
const requestsController = require('../controllers/requestsController');
var api = express.Router();

api.get('/all/:page?',requestsController.viewAll);
api.get('/view/:id',requestsController.viewRequest);
api.post('/create',requestsController.createRequest);
api.put('/update/:id',requestsController.updateRequest);
api.put('/updateStatus/:id',requestsController.changeStatus);
api.delete('/delete/:id',requestsController.deleteRequest);


module.exports = api;