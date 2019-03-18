'use strict'

const Bus = require('../models/bus');

function listAll (req, res) {
    var page = req.params.page ? req.params.page : 1;
    const busses_per_page = 5;
    const order = req.params.order ? req.params.order : 'space_box';

    Bus.find().sort(order).paginate(page,busses_per_page,(err,busses,total)=>{
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        return res.status(200).send({
            message :   'Lista de unidades de medida',
            busses   :   busses,
            total   :   total,
            pages   :   Math.ceil(total/busses_per_page)
        });
    });
}
function viewBus (req, res) {
    const busToView = req.params.id;

    Bus.findById(busToView,(err,bus)=>{
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        if(!bus) return res.status(404).send({message: 'La unidad de medida no existe'});
        return res.status(200).send({
            message :   'Unidad de medida encontrado',
            bus    :   bus
        });
    });
}
function createBus (req, res) {
    let busParams = req.body;
    if(busParams.user && busParams.license_plate && busParams.space_box ){
        let newBus = new Bus({
            space_box    :   busParams.space_box,
            user   :   busParams.user,
            license_plate :   busParams.license_plate,
        });
        Bus.find({license_plate  : newBus.license_plate}).exec((err, foundedBus) => {
            if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
            if(foundedBus && foundedBus.length>0) return res.status(302).send({message: 'La unidad de medida ya se encuentra registrada'});
                newBus.save((err,bus)=>{
                    if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
                    if(!bus) return res.status(201).send({
                        message :   'No se ha registrado la unidad de medida',
                        bus    :   bus
                    });
                    return res.status(201).send({
                        message :   'Unidad de medida registrada con éxito',
                        bus    :   bus
                    });
                });
        });
    }
}
function updateBus (req, res) {
    const busToUpdate = req.params.id;
    const updateInfo = req.body;

    Bus.findByIdAndUpdate(busToUpdate,updateInfo,{new: true}, (err, updtedBus)=>{
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        if(!updtedBus) return res.status(304).send({message: 'No se pudo actualizar la unidad de medida'});
        return res.status(200).send({
            message :   'Usuario actualizado',
            bus    :   updtedBus
        });
    });
}
function deleteBus (req, res) {
    const busToDelete = req.params.id;
    Bus.findById(busToDelete,(err, bus) => {
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        if(!bus) return res.status(404).send({message: 'No existe la unidad de medida'});
        Bus.findByIdAndRemove({'_id':busToDelete}).exec().then((removed) => {
            if(!removed) return res.status(401).send({message: 'La unidad de medida no ha sido eliminada'});
            return res.status(200).send({message: 'Unidad de medida eliminada con éxito'});
        }).catch((err) => {
            return err;
        });
    });
}


module.exports = {
    listAll,viewBus,
    createBus,
    updateBus,deleteBus
}
