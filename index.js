'use strict'

const mongoose = require('mongoose');
const app = require('./app');

const port = 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/cafeteria',{ useNewUrlParser: true }).then(()=>{
    console.log('Iniciando conexión con base de datos');
    app.listen(port,()=>{
        console.log('Conexión realizada');
    });
}).catch(err => console.log(err));
