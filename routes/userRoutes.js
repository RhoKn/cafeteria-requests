const express = require('express');
const usersController = require('../controllers/usersController');

var api = express.Router();

api.get('/',usersController.list);
api.get('/all',usersController.listAll);
api.get('/view/:id',usersController.viewUser);
api.post('/register',usersController.registerUser);
api.post('/login',usersController.loginUser);
api.put('/update/:id',usersController.updateUser);
api.delete('/delete/:id',usersController.deleteUser);

module.exports = api;