const { Router } = require('express');
const handleRequest = require('../functions/middleware/handleRequest');
const router = Router();

router.post('*', handleRequest);

module.exports = router;
