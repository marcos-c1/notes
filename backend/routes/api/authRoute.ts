const express = require('express');
const router = express.Router();
import { handlerAuth, handlerLogout } from "../../controllers/authController";

router.post('/auth', handlerAuth);
router.get('/logout', handlerLogout);

module.exports = router;