const { submitResponse } = require('../controllers/response-controller')
const express = require('express');
const router = express.Router()


// routes
router.post('/', submitResponse)

module.exports = router