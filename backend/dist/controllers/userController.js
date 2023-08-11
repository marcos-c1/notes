"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const User = require('../models/User');
const bcrypt = require('bcrypt');
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield User.find().exec();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ 'message': `No data found: ${error.message}` });
    }
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield User.findById(id).exec();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ 'message': `User not found: ${error.message}` });
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, username, email, password } = req.body;
    const alreadyHasUser = yield User.findOne({ username: username }).exec();
    if (alreadyHasUser)
        return res.status(409).json({ 'message': 'User already registred' });
    try {
        const hashedPwd = yield bcrypt.hash(password, 10);
        const result = yield User.create({
            "fullname": fullname,
            "email": email,
            "username": username,
            "password": hashedPwd
        });
        res.status(200).json({ 'message': `New user ${username} created!` });
    }
    catch (error) {
        res.status(500).json({ 'message': `User not created: ${error.message}` });
    }
});
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const hasUser = yield User.findById(id).exec();
    if (!hasUser)
        return res.status(404).json({ 'message': 'User not found' });
    try {
        const result = yield User.findByIdAndDelete(id);
        res.status(200).json({ 'message': `User ${result} deleted!` });
    }
    catch (error) {
        res.status(500).json({ 'message': `User not deleted: ${error.message}` });
    }
});
module.exports = {
    getUsers,
    getUserById,
    createUser,
    deleteUserById
};
