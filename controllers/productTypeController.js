'use strict'

const ProductType = require('../models/product-type');
const mongoosePaginate = require('mongoose-pagination');


function viewAll (req,res){
    let page = req.params.page ? req.params.page : 1;
    const types_per_page = 5;
    ProductType.find().populate('unit').sort('type').paginate(page, types_per_page, (err, types, total)=>{
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        return res.status(200).send({
            message     :   'Lista de tipos de productos',
            types    :   types,
            total       :   total,
            pages       :   Math.ceil(total/types_per_page)
        });
    });
}
function viewType (req,res){
    const typeToView = req.params.id;
    ProductType.findById(typeToView).exec((err,type)=>{
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        if(!type) return res.status(404).send({message: 'El tipo de producto no existe'});
        return res.status(200).send({
            message     :   'Tipo de producto encontrado',
            type     :   type
        });
    });
}
function updateType (req,res){
    const typeToUpdate = req.params.id;
    const updateInfo = req.body;
    ProductType.findByIdAndUpdate(typeToUpdate,updateInfo,{new: true}, (err, updatedType)=>{
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        if(!updatedType) return res.status(304).send({message: 'No se pudo actualizar el tipo de producto'});
        return res.status(200).send({
            message     :   'Tipo de producto actualizado',
            type     :   updatedType
        });
    });
}

function createType (req,res){
    let typeParams = req.body;
    if(typeParams.type){
            let newType = new ProductType({
                type        : typeParams.type
            });
            ProductType.find({type: newType.type}).exec((err, foundedType) => {
                if (err) return res.status(500).send({ message: 'Hubo un error en la petición' });
                if (foundedType && foundedType.length > 0) return res.status(302).send({ message: 'El tipo de producto ya se encuentra registrado' });
                newType.save((err, type) => {
                    if (err) return res.status(500).send({ message: 'Hubo un error en la petición' });
                    if (!type) return res.status(201).send({
                        message     : 'No se ha registrado el tipo de producto',
                        type    : type
                    });
                    return res.status(201).send({
                        message     : 'Tipo de producto registrado con éxito',
                        type     : type
                    });
                });

            });
    }else{
        return res.status(411).send({ message: 'Por favor complete todos los campos' });
    }
}
function deleteType (req,res){
    const typeToDelete = req.params.id;
    ProductType.findById(typeToDelete,(err, type) => {
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        if(!type) return res.status(404).send({message: 'No existe el tipo de producto'});
        ProductType.findByIdAndRemove({'_id':typeToDelete}).exec().then((removed) => {
            if(!removed) return res.status(401).send({message: 'El tipo de producto no ha sido eliminado'});
            return res.status(200).send({message: 'Tipo de producto eliminado con éxito'});
        }).catch((err) => {
            return err;
        });
    });
}


module.exports = {
    viewAll, viewType,
    updateType,createType, deleteType
}
