'use strict'

const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');
const moment = require('moment');

function list (req, res) {
    res.send('Hello');
}
function listAll (req, res) {
    var page = req.params.page ? req.params.page : 1;
    const usrs_per_page = 5;
    const order = req.params.order ? req.params.order : 'last_name';
    order != 'user_type' ? 
                order != 'first_name' ? 
                    order != 'last_name' ? 
                        'last_name' 
                        : order 
                : order 
             : order;
    User.find().sort(order).paginate(page,usrs_per_page,(err,users,total)=>{
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        return res.status(200).send({
            message :   'Lista de usuarios',
            users   :   users,
            total   :   total,
            pages   :   Math.ceil(total/usrs_per_page)
        });
    });

}
function viewUser (req, res) {
    const userToView = req.params.id;

    User.findById(userToView,(err,user)=>{
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        if(!user) return res.status(404).send({message: 'El usuario no existe'});
        user.password = undefined;
        return res.status(200).send({
            message :   'Usuario encontrado',
            user    :   user
        });        
    });

}
function registerUser (req, res) {
    let userParams = req.body;
    if(userParams.user_type && userParams.first_name && userParams.last_name && userParams.nick_name && userParams.password && userParams.email){
        let new_user = new User({
            user_type   :  userParams.user_type,
            first_name  : userParams.first_name ,
            last_name   :  userParams.last_name,
            nick_name   :  userParams.nick_name,
            email       :  userParams.email,
            image       :  null
        });
        new_user.registration_Date = new Date(moment().unix());
        User.find({
            $or: [
                {nick_name  : new_user.user_name},
                {email      : new_user.email}
            ]
        }).exec((err, foundedUsers) => {
            if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
            if(foundedUsers && foundedUsers.length>0) return res.status(302).send({message: 'El correo o usuario ya se encuentra registrado'});
            bcrypt.hash(userParams.password, null, null, (err, hash)=>{
                new_user.password = hash;
                new_user.save((err,newUser)=>{
                    if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
                    if(!newUser) return res.status(201).send({
                        message :   'No se ha registrado el usuario',
                        user    :   newUser
                    });
                    return res.status(201).send({
                        message :   'Usuario registrado con éxito',
                        user    :   newUser
                    });
                });
              });

        });
    }else{
        return res.status(411).send({message: 'Por favor complete todos los campos'});
    }
}
function loginUser (req, res) {
    const userToLogin = req.body;
    User.findOne({nick_name : userToLogin.nick_name},(err,user)=>{
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        if(user){
            bcrypt.compare(userToLogin.password, user.password,(err, areEqual)=>{
                if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
                if(!areEqual) return res.status(404).send({message: 'Contraseña incorrecta'});
                user.password = undefined;
                return res.status(200).send({
                    message :   'Usuario loggeado',
                    user    :   user
                });
            });
        }else{
            return res.status(404).send({message: 'No existe el usuario'});
        }
    });

}
function updateUser (req, res) {
    const userToUpdate = req.params.id;
    const updateInfo = req.body;

    User.findByIdAndUpdate(userToUpdate,updateInfo,{new: true}, (err, updatedUser)=>{
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        if(!updatedUser) return res.status(304).send({message: 'No se pudo actualizar el usuario'});
        updatedUser.password = undefined;
        return res.status(200).send({
            message :   'Usuario actualizado',
            user    :   updatedUser
        });
    });

}
function deleteUser (req, res) {
    const userToDelete = req.params.id;
    User.findById(userToDelete,(err, user) => {
        if(err) return res.status(500).send({message: 'Hubo un error en la petición'});
        if(!user) return res.status(404).send({message: 'No existe el usuario'});
        User.findByIdAndRemove({'_id':userToDelete}).exec().then((removed) => {
            if(!removed) return res.status(401).send({message: 'El usuario no ha sido eliminado'});
            return res.status(200).send({message: 'Usuario eliminado con éxito'});
        }).catch((err) => {
            return err;
        });
    });
}


module.exports = {
    list,listAll,viewUser,
    registerUser,loginUser,
    updateUser,deleteUser
}
