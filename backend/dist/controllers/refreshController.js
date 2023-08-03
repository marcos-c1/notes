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
const jwt = require("jsonwebtoken");
require('dotenv').config();
const handleRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
        return res.status(401);
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
    try {
        const findUserByToken = yield User.findOne({ refreshToken: refreshToken }).exec();
        if (!findUserByToken)
            return res.sendStatus(403);
        // evaluate jwt
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err || findUserByToken.username !== decoded.username)
                return res.sendStatus(403);
            const accessToken = jwt.sign({ "username": findUserByToken.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
            res.json({ accessToken });
        });
    }
    catch (error) {
        res.status(500).json({ 'message': `Server error: ${error.message}` });
    }
});
module.exports = {
    handleRefreshToken
};
