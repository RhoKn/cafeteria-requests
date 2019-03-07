'use strict'

const Request = require('../models/request');
const Product = require('../models/product');
const DRoom = require('../models/dinning-room');
var mongoose = require('mongoose');

function viewAll (req,res){
    let page = req.params.page ? req.params.page : 1;
    const request_per_page = 5;
    const order = req.params.order ? req.params.order : 'created_at';
    Request.find().populate('dRoom').populate('products').sort(order).paginate(page, request_per_page, (err, requests, total)=>{
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        return res.status(200).send({
            message     :   'Lista de pedidos',
            requests    :   requests,
            total       :   total,
            pages       :   Math.ceil(total/request_per_page)
        });
    });
}
function viewRequest (req,res){
    const requestToView = req.params.id;
    Request.findById(requestToView).exec((err,request)=>{
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        if(!request) return res.status(404).send({message: 'El pedido no existe'});
        return res.status(200).send({
            message     :   'Pedido encontrado',
            request     :   request
        });        
    });
}
function updateRequest (req,res){
    
}

function createRequest (req,res){
    
}


function deleteRequest (req,res){
    
}


module.exports = {
    viewAll, viewRequest, 
    updateRequest,createRequest, deleteRequest
}