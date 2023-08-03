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
const { getUsers, getUsersById, createUser, deleteUserById } = require('../../controllers/userController');
const mongoose = require("mongoose");
require("dotenv").config();
describe('user route testing', () => {
    test('get all users', () => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose.connect(process.env.MONGO_URI);
        const res = fetch('localhost:5000/users/', 'get').then((r) => expect(r).toBe([]));
    }));
});
