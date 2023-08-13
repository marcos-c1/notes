"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const authController_1 = require("../../controllers/authController");
router.post('/auth', authController_1.handlerAuth);
router.get('/logout', authController_1.handlerLogout);
module.exports = router;
