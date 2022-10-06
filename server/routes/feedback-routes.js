const { addFeedback } = require('../controllers/feedback-controller')
const express = require('express');
const router = express.Router()


router.post('/', addFeedback)


module.exports = router