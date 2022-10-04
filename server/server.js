const express = require('express');
const app = express()
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config()
const connection = require('./db')
const student_routes = require('./routes/student-routes')
const faculty_routes = require('./routes/faculty-routes')
const subject_routes = require('./routes/subject-routes')
const classroom_routes = require('./routes/classroom-routes')

// connecting to database
connection()

// Variables
const PORT = process.env.PORT || 8080        

// middlewares
app.use(cors())
app.use(cookieParser())
app.use(morgan('tiny'))
app.use(express.json())

// set routes
app.use('/api/student', student_routes)
app.use('/api/faculty', faculty_routes)
app.use('/api/subject', subject_routes)
app.use('/api/classroom', classroom_routes)

// listening to port
try {
    app.listen(PORT, ()=>{
        console.log(`listening on port ${PORT}....`)
    })
} catch (error) {
    console.log(error)
}