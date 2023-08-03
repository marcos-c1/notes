"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const refreshController_1 = require("../../controllers/refreshController");
router.get('/refresh', refreshController_1.handleRefreshToken);
module.exports = router;
