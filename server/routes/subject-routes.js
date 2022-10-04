const { addSubjects, getSubjects, updateSubject, deleteSubject } = require('../controllers/subject-controller')
const express = require('express')
const router = express.Router()

// set routes
router.post('/add', addSubjects)
router.get('/get', getSubjects)
router.post('/update', updateSubject)
router.post('/delete', deleteSubject)



module.exports = router

