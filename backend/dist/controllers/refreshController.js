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
const Note = require('../models/Note');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const handleRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt)) {
        res.status(401);
    }
    else {
        const refreshToken = cookies.jwt;
        try {
            const findUserByToken = yield User.findOne({ refreshToken: refreshToken }, { refreshToken: { $elemMatch: { refreshToken: String } } }).exec();
            // evaluate jwt
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
                if (err || findUserByToken.username !== decoded.username)
                    return res.sendStatus(403);
                const accessToken = jwt.sign({ "username": findUserByToken.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
                const notesFromUser = yield Note.find({ user: findUserByToken.id }).exec();
                res.json({ 'id': findUserByToken._id, 'username': findUserByToken.username, 'accessToken': accessToken, 'notes': notesFromUser });
            }));
        }
        catch (error) {
            res.status(500).json({ 'message': `Server error: ${error.message}` });
        }
    }
});
module.exports = {
    handleRefreshToken
};
