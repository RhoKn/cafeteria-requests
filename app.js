'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');

var app = express();


//rutas
app.get('/', function(req, res) {
  res.send('Hello');
});



// cabeceras http
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  next();
});

app.use('/users',userRoutes);

module.exports = app;
