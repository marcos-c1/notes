const express = require("express");
const router = express.Router();
import { getUsers, getUserById, createUser, deleteUserById, findUserByToken } from '../../controllers/userController'
import verifyJWT = require('../../middleware/verifyJWT');

router.get('/users/', getUsers);

router.get('/user/:id', getUserById);

router.get('/user', findUserByToken);

router.post('/user/register', createUser);

router.delete('/user/:id', deleteUserById);

module.exports = router
