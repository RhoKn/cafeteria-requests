'use strict'

const Product = require('../models/product');
const mongoosePaginate = require('mongoose-pagination');
var mongoose = require('mongoose');

function viewAll (req,res){
    let page = req.params.page ? req.params.page : 1;
    const pdcts_per_page = 5;
    const order = req.params.order ? req.params.order : 'name';
    Product.find().populate('unit').sort(order).paginate(page, pdcts_per_page, (err, products, total)=>{
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        return res.status(200).send({
            message     :   'Lista de productos',
            products    :   products,
            total       :   total,
            pages       :   Math.ceil(total/pdcts_per_page)
        });
    });
}
function viewProduct (req,res){
    const productToView = req.params.id;
    Product.findById(productToView).exec((err,product)=>{
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        if(!product) return res.status(404).send({message: 'El producto no existe'});
        return res.status(200).send({
            message     :   'Producto encontrado',
            product     :   product
        });        
    });
}
function updateProduct (req,res){
    const productToUpdate = req.params.id;
    const updateInfo = req.body;
    
    if(updateInfo.unit && !mongoose.Types.ObjectId.isValid(updateInfo.unit)){
        return res.status(400).send({ message: 'Unidad de medida inválida' }); 
    }
            
    Product.findByIdAndUpdate(productToUpdate,updateInfo,{new: true}, (err, updatedProduct)=>{
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        if(!updatedProduct) return res.status(304).send({message: 'No se pudo actualizar el proveedor'});
        return res.status(200).send({
            message     :   'Producto actualizado',
            product     :   updatedProduct
        });
    });
}

function createProduct (req,res){
    let productParams = req.body;
    if(productParams.name && productParams.unit && productParams.category && productParams.description && productParams.price){
        if(mongoose.Types.ObjectId.isValid(productParams.unit)){
            let newProduct = new Product({
                name        : productParams.name,
                unit        : productParams.unit,
                category    : productParams.category,
                price       : productParams.price,
            });
            Product.find({name: newProduct.name}).exec((err, foundedProducts) => {
                if (err) return res.status(500).send({ message: 'Hubo un error en la petición' });
                if (foundedProducts && foundedProducts.length > 0) return res.status(302).send({ message: 'El producto ya se encuentra registrado' });
                newProduct.save((err, product) => {
                    if (err) return res.status(500).send({ message: 'Hubo un error en la petición' });
                    if (!product) return res.status(201).send({
                        message     : 'No se ha registrado el producto',
                        product    : product
                    });
                    return res.status(201).send({
                        message     : 'Producto registrado con éxito',
                        product     : product
                    });
                });
    
            });
        }else{
            return res.status(400).send({ message: 'Unidad de medida inválida' }); 
        }  
    }else{
        return res.status(411).send({ message: 'Por favor complete todos los campos' });
    }
}
function deleteProduct (req,res){
    const productToDelete = req.params.id;
    Product.findById(productToDelete,(err, product) => {
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        if(!product) return res.status(404).send({message: 'No existe el producto'});
        Product.findByIdAndRemove({'_id':productToDelete}).exec().then((removed) => {
            if(!removed) return res.status(401).send({message: 'El producto no ha sido eliminado'});
            return res.status(200).send({message: 'Producto eliminado con éxito'});
        }).catch((err) => {
            return err;
        });
    });
}


module.exports = {
    viewAll, viewProduct, 
    updateProduct,createProduct, deleteProduct
}