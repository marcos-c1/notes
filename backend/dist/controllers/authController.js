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
const jwt = require("jsonwebtoken");
require('dotenv').config();
const handlerAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ 'message': 'Username and password are required' });
    }
    const findUser = yield User.findOne({ username: username }).exec();
    const match = bcrypt.compare(password, findUser.password);
    if (match) {
        const accessToken = jwt.sign({ "username": findUser.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
        const refreshToken = jwt.sign({ "username": findUser.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
        findUser.refreshToken = refreshToken;
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        findUser.save().then((r) => console.log(`${r} salvo!`));
        res.status(200).json({ 'id': findUser._id, 'accessToken': accessToken });
    }
    else {
        res.status(401);
    }
});
module.exports = {
    handlerAuth
};
