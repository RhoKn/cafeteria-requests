'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const providerRoutes = require('./routes/providerRoutes');
const dinningRoomRoutes = require('./routes/dinning-roomRoutes');
const unitRoutes = require('./routes/unitRoutes');
const requestRoutes = require('./routes/requestRoutes');

var app = express();


//rutas
app.get('/', function(req, res) {
  res.send('Hello');
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// cabeceras http
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  next();
});

app.use('/users',userRoutes);
app.use('/products',productRoutes);
app.use('/providers',providerRoutes);
app.use('/dinningRooms',dinningRoomRoutes);
app.use('/requests',requestRoutes);
app.use('/units',unitRoutes);

module.exports = app;
