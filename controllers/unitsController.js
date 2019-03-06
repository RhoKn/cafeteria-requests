'use strict'

const Unit = require('../models/unit');

function listAll (req, res) {
    var page = req.params.page ? req.params.page : 1;
    const units_per_page = 5;
    const order = req.params.order ? req.params.order : 'name';
    
    Unit.find().sort(order).paginate(page,units_per_page,(err,units,total)=>{
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        return res.status(200).send({
            message :   'Lista de unidades de medida',
            units   :   units,
            total   :   total,
            pages   :   Math.ceil(total/units_per_page)
        });
    });
}
function viewUnit (req, res) {
    const unitToView = req.params.id;

    Unit.findById(unitToView,(err,unit)=>{
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        if(!unit) return res.status(404).send({message: 'La unidad de medida no existe'});
        return res.status(200).send({
            message :   'Unidad de medida encontrado',
            unit    :   unit
        });        
    });
}
function createUnit (req, res) {
    let unitParams = req.body;
    if(unitParams.name && unitParams.units){
        let newUnit = new Unit({
            name   :    unitParams.name,
            units  :    unitParams.units
        });
        Unit.find({name  : newUnit.name}).exec((err, foundedUnits) => {
            if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
            if(foundedUnits && foundedUnits.length>0) return res.status(302).send({message: 'La unidad de medida ya se encuentra registrada'});
                newUnit.save((err,unit)=>{
                    if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
                    if(!unit) return res.status(201).send({
                        message :   'No se ha registrado la unidad de medida',
                        unit    :   unit
                    });
                    return res.status(201).send({
                        message :   'Unidad de medida registrada con éxito',
                        unit    :   unit
                    });
                });
        });
    }else{
        return res.status(411).send({message: 'Por favor complete todos los campos'});
    }
}
function updateUnit (req, res) {
    const unitToUpdate = req.params.id;
    const updateInfo = req.body;

    Unit.findByIdAndUpdate(unitToUpdate,updateInfo,{new: true}, (err, updtedUnit)=>{
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        if(!updtedUnit) return res.status(304).send({message: 'No se pudo actualizar la unidad de medida'});
        return res.status(200).send({
            message :   'Usuario actualizado',
            unit    :   updtedUnit
        });
    });
}
function deleteUnit (req, res) {
    const unitToDelete = req.params.id;
    Unit.findById(unitToDelete,(err, unit) => {
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        if(!unit) return res.status(404).send({message: 'No existe la unidad de medida'});
        Unit.findByIdAndRemove({'_id':unitToDelete}).exec().then((removed) => {
            if(!removed) return res.status(401).send({message: 'La unidad de medida no ha sido eliminada'});
            return res.status(200).send({message: 'Unidad de medida eliminada con éxito'});
        }).catch((err) => {
            return err;
        });
    });
}


module.exports = {
    listAll,viewUnit,
    createUnit,
    updateUnit,deleteUnit
}
