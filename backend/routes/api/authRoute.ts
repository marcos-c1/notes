const express = require('express');
const router = express.Router();
import { handlerAuth } from "../../controllers/authController";

router.post('/auth', handlerAuth);

module.exports = router;