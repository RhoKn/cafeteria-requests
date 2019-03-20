'use strict'

const Request = require('../models/request');
const User = require('../models/user');
const Delivery = require('../models/delivery');
var mongoose = require('mongoose');
const moment = require('moment');

function viewAll (req,res){
    let page = req.params.page ? req.params.page : 1;
    const deliveries_per_page =25;
    const order = req.params.order ? req.params.order : 'created_at';
    Delivery.find().sort(order).populate('bus').paginate(page, deliveries_per_page, (err, deliveries, total)=>{
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        return res.status(200).send({
            message     :   'Lista de Salidas',
            deliveries  :   deliveries,
            total       :   total,
            pages       :   Math.ceil(total/deliveries_per_page)
        });
    });
}
function viewDelivery (req,res){
    const deliveryToView = req.params.id;
    Delivery.findById(deliveryToView).populate('bus').populate('request').exec((err,delivery)=>{
      console.log(err);
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        if(!delivery) return res.status(404).send({message: 'La salida no existe'});
        return res.status(200).send({
            message     :   'Pedido encontrado',
            delivery     :   delivery
        });
    });
}
function updateDelivery (req,res){
    const updateDelivery  = req.params.id;
    const updateInfo = req.body;

    // if(updateInfo.request && !mongoose.Types.ObjectId.isValid(updateInfo.request._id)){
    //     return res.status(400).send({ message: 'Comedor inválido' });
    // }


    Delivery.findByIdAndUpdate(updateDelivery,updateInfo,{new: true}, (err, updatedDelivery)=>{
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        if(!updatedDelivery) return res.status(304).send({message: 'No se pudo actualizar la salida'});
        return res.status(200).send({
            message         :   'Pedido actualizado',
            delivery    :   updatedDelivery
        });
    });
}

function createDelivery  (req,res){
    let reqParams = req.body;
    console.log(reqParams)
    if(reqParams.bus){

            let newDel = new Delivery({
                bus: reqParams.bus,
                request:reqParams.requests,
                status:reqParams.status,
                delivery:reqParams.deliver,
                readyFD:{
                  user: reqParams.user,
                  date: moment().format('MMMM Do YYYY, h:mm:ss a'),
                }
            });




                newDel.save((err,deliveryAdded)=>{
                        if(err) return res.status(500).send({message: 'Hubo un error en la salida'});
                        if(!deliveryAdded) return res.status(201).send({
                            message :   'No se ha registrado la salida',
                            delivery    :   deliveryAdded
                        });
                        return res.status(201).send({
                            message :   'Salida registrada con éxito',
                            delivery    :   deliveryAdded
                        });
                    });


    }else{
        return res.status(411).send({message: 'Por favor complete todos los campos'});
    }
}


function deleteDelivery  (req,res){
    const delToDelete = req.params.id;
    Delivery.findById(delToDelete,(err, requestFound) => {
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        if(!requestFound) return res.status(404).send({message: 'No existe el comedor'});
        Delivery.findByIdAndRemove({'_id':delToDelete}).exec().then((removed) => {
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
        status.status = 'En ruta';
    }else if(req.body.type == 'Approved'){
        status.approved = {
            date : moment().format('MMMM Do YYYY, h:mm:ss a'),
            user : req.body.user
        }
        status.status = 'Recibido';
    }else{
        status.rejected = {
            date : moment().format('MMMM Do YYYY, h:mm:ss a'),
            user : req.body.user
        }
        status.status = 'Rechazado';
    }

  //  status.AuthObservations = req.body.AuthObservations;

    Request.findByIdAndUpdate(delToEdit,status,{new: true}, (err, updatedDelivery)=>{
        if(err) return res.status(500).send({message: 'Hubo un error en la salida'});
        if(!updatedDelivery) return res.status(304).send({message: 'No se pudo actualizar la salida'});

        return res.status(200).send({
            message    :   'Salida actualizada',
            request    :   updatedDelivery
        });
    });

}

module.exports = {
    viewAll, viewDelivery , updateDelivery ,
    createDelivery , deleteDelivery, changeStatus
}
