const express = require('express');
const app = express()
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config()
const connection = require('./db')
const student_routes = require('./routes/student-routes')
const feedback_routes = require('./routes/feedback-routes')
const auth_routes = require('./routes/auth-routes.js')

// connecting to database
connection()

// Variables
const PORT = process.env.PORT || 8080        

// middlewares
app.use(cors())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.json())

// set routes
app.use('/api/student', student_routes)
app.use('/api/feedback', feedback_routes)
app.use('/api/auth', auth_routes)

// listening to port
try {
    app.listen(PORT, ()=>{
        console.log(`listening on port ${PORT}....`)
    })
} catch (error) {
    console.log(error)
}