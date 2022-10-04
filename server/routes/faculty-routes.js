const { addFaculties, getFaculties, updateFaculties, deleteFaculties } = require('../controllers/faculty-controller')
const express = require('express')
const router = express.Router()

// set routes
router.post('/add', addFaculties)
router.get('/get', getFaculties)
router.post('/update', updateFaculties)
router.post('/delete', deleteFaculties)



module.exports = router

