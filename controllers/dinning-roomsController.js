'use strict'

const DRoom = require('../models/dinning-room');
var mongoose = require('mongoose');

function viewAll (req,res){
    let page = req.params.page ? req.params.page : 1;
    const drooms_per_page = 5;
    const order = req.params.order ? req.params.order : 'comedor';
    DRoom.find().populate('user').sort(order).paginate(page, drooms_per_page, (err, dRooms, total)=>{
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        return res.status(200).send({
            message     :   'Lista de comedores',
            dRooms      :   dRooms,
            total       :   total,
            pages       :   Math.ceil(total/drooms_per_page)
        });
    });
}
function viewDRoom (req,res){
    const dRoomToView = req.params.id;
    DRoom.findById(dRoomToView).exec((err,droom)=>{
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        if(!droom) return res.status(404).send({message: 'El comedor no existe'});
        return res.status(200).send({
            message     :   'Comedor encontrado',
            droom       :   droom
        });        
    });
}
function updateDRoom (req,res){
    const dRoomToUpdte = req.params.id;
    const updateInfo = req.body;
    
    if(updateInfo.user && !mongoose.Types.ObjectId.isValid(updateInfo.user)){
        return res.status(400).send({ message: 'Usuario inválido' }); 
    }
            
    DRoom.findByIdAndUpdate(dRoomToUpdte,updateInfo,{new: true}, (err, updatedDRoom)=>{
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        if(!updatedDRoom) return res.status(304).send({message: 'No se pudo actualizar el comedor'});
        return res.status(200).send({
            message         :   'Comedor actualizado',
            updatedDRoom    :   updatedDRoom
        });
    });
}

function createDRoom (req,res){
    let dRoomParams = req.body;
    if(dRoomParams.user && dRoomParams.dRoom && dRoomParams.description){
        if(mongoose.Types.ObjectId.isValid(dRoomParams.user)){
            let newDroom = new DRoom({
                user           : dRoomParams.user,
                dRoom          : dRoomParams.dRoom,
                description    : dRoomParams.description
            });
            DRoom.find({name: newDroom.dRoom}).exec((err, foundedDRooms) => {
                if (err) return res.status(500).send({ message: 'Hubo un error en la petición' });
                if (foundedDRooms && foundedDRooms.length > 0) return res.status(302).send({ message: 'El comedor ya se encuentra registrado' });
                newDroom.save((err, dRoom) => {
                    if (err) return res.status(500).send({ message: 'Hubo un error en la petición' });
                    if (!dRoom) return res.status(201).send({
                        message     : 'No se ha registrado el comedor',
                        dRoom       : dRoom
                    });
                    return res.status(201).send({
                        message     : 'Comedor registrado con éxito',
                        dRoom       : dRoom
                    });
                });
    
            });
        }else{
            return res.status(400).send({ message: 'Usuario invalido' }); 
        }  
    }else{
        return res.status(411).send({ message: 'Por favor complete todos los campos' });
    }
}
function deleteDRoom (req,res){
    const dRoomToDelete = req.params.id;
    DRoom.findById(dRoomToDelete,(err, dRoom) => {
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        if(!dRoom) return res.status(404).send({message: 'No existe el comedor'});
        DRoom.findByIdAndRemove({'_id':dRoomToDelete}).exec().then((removed) => {
            if(!removed) return res.status(401).send({message: 'El comedor no ha sido eliminado'});
            return res.status(200).send({message: 'Comedor eliminado con éxito'});
        }).catch((err) => {
            return err;
        });
    });
}


module.exports = {
    viewAll, viewDRoom, 
    updateDRoom,createDRoom, deleteDRoom
}