const express = require('express');
const router = express.Router()
const { addStudents, getStudents, updateStudents, deleteStudents } = require('../controllers/student-controller')
const studentValidationSchema = require('../utils/validation/student-validation')
const { validateData } = require('../utils/middlewares')

// set routes
router.post('/', validateData(studentValidationSchema), addStudents)
router.get('/', getStudents)
router.put('/', updateStudents) // not working
router.delete('/', deleteStudents)


module.exports = router