'use strict'

const Product = require('../models/product');
const mongoosePaginate = require('mongoose-pagination');
var mongoose = require('mongoose');

function test (req,res){
    res.send('Hello');
}

function viewAll (req,res){
    res.send('Hello');
}
function viewProduct (req,res){
    res.send('Hello');
}
function updateProduct (req,res){
    res.send('Hello');
}
function createProduct (req,res){
    res.send('Hello');
}
function deleteProduct (req,res){
    res.send('Hello');
}


module.exports = {
    test,viewAll, viewProduct, 
    updateProduct,createProduct, deleteProduct
}