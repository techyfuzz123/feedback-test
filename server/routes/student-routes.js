const express = require('express');
const router = express.Router()
const { addStudent, getStudent, updateStudent, deleteStudent } = require('../controllers/student-controller')

// set routes
router.post('/add', addStudent)
router.get('/get', getStudent)
router.post('/update', updateStudent)
router.post('/delete', deleteStudent)


module.exports = router