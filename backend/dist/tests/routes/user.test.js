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
require("dotenv").config();
describe('user route testing', () => {
    test('get all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield fetch('http://localhost:5000/users', {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
            },
        });
        expect(res.status).toBe(200);
    }));
    test('create a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = '{"username": "teste", "password": "123"}';
        const res = yield fetch('http://localhost:5000/user/register', {
            method: 'POST',
            body: payload,
            headers: {
                "Content-type": "application/json",
            },
        });
        expect(res.status).toBe(200 || 409);
    }));
    test('delete a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const id = "64cbf8da99aa918439a4fa42";
        const res = yield fetch(`http://localhost:5000/user/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json",
            },
        });
        expect(res.status).toBe(200 || 404);
    }));
});
