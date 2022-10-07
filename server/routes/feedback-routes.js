const { addFeedback } = require('../controllers/feedback-controller')
const express = require('express');
const router = express.Router()
const feedbackValidationSchema = require('../utils/validation/feedback-validation')
const { validateData } = require('../utils/middlewares')


router.post('/', validateData(feedbackValidationSchema), addFeedback)


module.exports = router