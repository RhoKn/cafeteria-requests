const express = require('express');
const dinningRoomRoutes = require('../controllers/dinning-roomsController');
var api = express.Router();

api.get('/all/:page?',dinningRoomRoutes.viewAll);
api.get('/view/:id',dinningRoomRoutes.viewDRoom);
api.post('/create',dinningRoomRoutes.createDRoom);
api.put('/update/:id',dinningRoomRoutes.updateDRoom);
api.delete('/delete/:id',dinningRoomRoutes.deleteDRoom);


module.exports = api;