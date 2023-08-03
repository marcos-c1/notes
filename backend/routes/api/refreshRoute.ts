const express = require('express');
const router = express.Router();
import { handleRefreshToken } from '../../controllers/refreshController';

router.get('/refresh', handleRefreshToken);

module.exports = router;
