'use strict'

const Request = require('../models/request');
const Product = require('../models/product');
const DRoom = require('../models/dinning-room');
var mongoose = require('mongoose');
const moment = require('moment');

function viewAll (req,res){
    let page = req.params.page ? req.params.page : 1;
    const request_per_page = 5;
    const order = req.params.order ? req.params.order : 'created_at';
    Request.find().sort(order).populate('dRoom').paginate(page, request_per_page, (err, requests, total)=>{
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
    const updateRequest = req.params.id;
    const updateInfo = req.body;

    if(updateInfo.dRoom && !mongoose.Types.ObjectId.isValid(updateInfo.dRoom)){
        return res.status(400).send({ message: 'Comedor inválido' });
    }

    Request.findByIdAndUpdate(updateRequest,updateInfo,{new: true}, (err, updatedRequest)=>{
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        if(!updatedRequest) return res.status(304).send({message: 'No se pudo actualizar el pedido'});
        return res.status(200).send({
            message         :   'Pedido actualizado',
            request    :   updatedRequest
        });
    });
}

function createRequest (req,res){
    let reqParams = req.body;
    console.log(reqParams)
    if(reqParams.dRoom && reqParams.products && reqParams.user && reqParams.observations){
        if(mongoose.Types.ObjectId.isValid(reqParams.dRoom)){
            let newReq = new Request({
                dRoom           :   reqParams.dRoom,
                products        :   reqParams.products,
                status          :   'Creado',
                created      :  {
                                    date: moment().format('MMMM Do YYYY, h:mm:ss a'),
                                    user: reqParams.user,
                                },
                authorized  :   {
                                    date: 'N/A',
                                    user: 'N/A',
                                },
                approved    :   {
                                    date: 'N/A',
                                    user: 'N/A',
                                },
                rejected    :   {
                                    date: 'N/A',
                                    user: 'N/A',
                                },
                observations    :   reqParams.observations,
                AuthObservations:   '',
                created_at      :   moment().format('MMMM Do YYYY, h:mm:ss a')
            });

            Request.find({created_at  : newReq.created_at}).exec((err, foundedReq) => {
                if(err) return res.status(500).send({message: 'Hubo un error en la petición'});

                newReq.save((err,requestAdded)=>{
                        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
                        if(!requestAdded) return res.status(201).send({
                            message :   'No se ha registrado el pedido',
                            request    :   requestAdded
                        });
                        return res.status(201).send({
                            message :   'Pedido registrado con éxito',
                            request    :   requestAdded
                        });
                    });
            });
        }else{
            return res.status(400).send({ message: 'Comedor invalido' });
        }
    }else{
        return res.status(411).send({message: 'Por favor complete todos los campos'});
    }
}


function deleteRequest (req,res){
    const reqToDelete = req.params.id;
    Request.findById(reqToDelete,(err, requestFound) => {
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        if(!requestFound) return res.status(404).send({message: 'No existe el comedor'});
        Request.findByIdAndRemove({'_id':reqToDelete}).exec().then((removed) => {
            if(!removed) return res.status(401).send({message: 'El pedido no ha sido eliminado'});
            return res.status(200).send({message: 'Pedido eliminado con éxito'});
        }).catch((err) => {
            return err;
        });
    });
}

function changeStatus (req, res) {
    let reqToEdit = req.params.id;
    let status = {};

    if(req.body.type == 'Authorization') {
        status.authorized = {
            date : moment().format('MMMM Do YYYY, h:mm:ss a'),
            user : req.body.user
        }
        status.status = 'Autorizado';
    }else if(req.body.type == 'Approved'){
        status.approved = {
            date : moment().format('MMMM Do YYYY, h:mm:ss a'),
            user : req.body.user
        }
        status.status = 'Aprobado';
    }else{
        status.rejected = {
            date : moment().format('MMMM Do YYYY, h:mm:ss a'),
            user : req.body.user
        }
        status.status = 'Rechazado';
    }

    status.AuthObservations = req.body.AuthObservations;

    Request.findByIdAndUpdate(reqToEdit,status,{new: true}, (err, updatedRequest)=>{
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        if(!updatedRequest) return res.status(304).send({message: 'No se pudo actualizar el pedido'});

        return res.status(200).send({
            message    :   'Pedido actualizado',
            request    :   updatedRequest
        });
    });

}

module.exports = {
    viewAll, viewRequest, updateRequest,
    createRequest, deleteRequest, changeStatus
}
