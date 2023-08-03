const express = require("express");
const router = express.Router();
import { getUsers, getUserById, createUser, deleteUserById } from '../../controllers/userController'

router.get('/users/', getUsers);

router.get('/user/:id', getUserById);

router.post('/user/register', createUser); 

router.delete('/user/:id', deleteUserById);

module.exports = router
