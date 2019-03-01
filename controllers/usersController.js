'use strict'

const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');


const mongoosePaginate = require('mongoose-pagination');
var mongoose = require('mongoose');

function list (req, res) {
    res.send('Hello');
}
function listAll (req, res) {
    res.send('Hello');
}
function viewUser (req, res) {
    res.send('Hello');
}
function registerUser (req, res) {
    res.send('Hello');
}
function loginUser (req, res) {
    res.send('Hello');
}
function updateUser (req, res) {
    res.send('Hello');
}
function deleteUser (req, res) {
    res.send('Hello');
}


module.exports = {
    list,listAll,viewUser,
    registerUser,loginUser,
    updateUser,deleteUser
}
