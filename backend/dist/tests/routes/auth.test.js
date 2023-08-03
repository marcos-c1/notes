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
describe('test auth route', () => {
    test('testing auth/', () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = '{"username": "teste", "password": "123"}';
        const res = yield fetch('http://localhost:5000/auth', {
            method: 'POST',
            body: payload
        });
        expect(res.status).toBe(200);
    }));
});
