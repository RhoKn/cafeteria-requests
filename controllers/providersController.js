'use strict'

const Provider = require('../models/provider');
const moment = require('moment');

function listAll(req, res) {
    var page = req.params.page ? req.params.page : 1;
    const provs_per_page = 5;
    const order = req.params.order ? req.params.order : 'name';
    order != 'contact_first_name' ? 
                order != 'contact_last_name' ? 
                    'name'
                : order 
             : order;
    Provider.find().sort(order).paginate(page,provs_per_page,(err,providers,total)=>{
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        return res.status(200).send({
            message     :   'Lista de proveedores',
            providers   :   providers,
            total       :   total,
            pages       :   Math.ceil(total/provs_per_page)
        });
    });
}
function viewProvider(req, res) {
    const providerToView = req.params.id;
    Provider.findById(providerToView,(err,provider)=>{
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        if(!provider) return res.status(404).send({message: 'El proveedor no existe'});
        return res.status(200).send({
            message     :   'Usuario encontrado',
            provider    :   provider
        });        
    });
}
function createProvider(req, res) {
    let providerParams = req.body;
    if (Object.keys(providerParams).length > 8) {
        let newProvider = new Provider({
            name                : providerParams.name,
            contact_first_name  : providerParams.contact_first_name,
            contact_last_name   : providerParams.contact_last_name,
            phone_number        : providerParams.phone_number,
            email               : providerParams.email,
            RFC                 : providerParams.RFC,
            postal_code         : providerParams.postal_code,
            street_name         : providerParams.street_name,
            street_number       : providerParams.street_number,
            suite_number        : providerParams.suite_number ? providerParams.suite_number : 'N/A',
            colony              : providerParams.colony
        });
        Provider.find({
            $or: [
                { name: newProvider.name },
                { RFC: newProvider.RFC }
            ]
        }).exec((err, foundedProviders) => {
            if (err) return res.status(500).send({ message: 'Hubo un error en la petición' });
            if (foundedProviders && foundedProviders.length > 0) return res.status(302).send({ message: 'El RFC o proveedor ya se encuentra registrado' });
            newProvider.save((err, provider) => {
                if (err) return res.status(500).send({ message: 'Hubo un error en la petición' });
                if (!provider) return res.status(201).send({
                    message     : 'No se ha registrado el proveedor',
                    provider    : provider
                });
                return res.status(201).send({
                    message     : 'Proveedor registrado con éxito',
                    provider    : provider
                });
            });

        });
    } else {
        res.status(411).send({ message: 'Por favor complete todos los campos' });
    }
}

function updateProvider(req, res) {
    const providerToUpdate = req.params.id;
    const updateInfo = req.body;

    Provider.findByIdAndUpdate(providerToUpdate,updateInfo,{new: true}, (err, updatedProvider)=>{
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        if(!updatedProvider) return res.status(304).send({message: 'No se pudo actualizar el proveedor'});
        return res.status(200).send({
            message     :   'Proveedor actualizado',
            provider    :   updatedProvider
        });
    });
}
function deleteProvider(req, res) {
    const providerToDelete = req.params.id;
    Provider.findById(providerToDelete,(err, provider) => {
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        if(!provider) return res.status(404).send({message: 'No existe el proveedor'});
        Provider.findByIdAndRemove({'_id':providerToDelete}).exec().then((removed) => {
            if(!removed) return res.status(401).send({message: 'El proveedor no ha sido eliminado'});
            return res.status(200).send({message: 'Proveedor eliminado con éxito'});
        }).catch((err) => {
            return err;
        });
    });
}


module.exports = {
    listAll, viewProvider,
    createProvider,
    updateProvider, deleteProvider
}
