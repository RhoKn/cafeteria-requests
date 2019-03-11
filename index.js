'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config').get(process.env.NODE_ENV == undefined ? "dev" : process.env.NODE_ENV);



mongoose.Promise = global.Promise;
mongoose.connect(config.mlab,{ useNewUrlParser: true }).then(()=>{
    console.log(config.startingProcessMSJ);
    app.listen(config.port,()=>{
        console.log(config.startedProcessMSJ);
    });
}).catch(err => console.log(err));
