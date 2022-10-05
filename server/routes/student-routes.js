const express = require('express');
const router = express.Router()
const { addStudents, getStudents, updateStudents, deleteStudents } = require('../controllers/student-controller')

// set routes
router.post('/', addStudents)
router.get('/', getStudents)
router.put('/', updateStudents) // not working
router.delete('/', deleteStudents)


module.exports = router