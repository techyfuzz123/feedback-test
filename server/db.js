const mongoose = require('mongoose');
require('dotenv').config()

// Variables
const DB = process.env.DB
const DB_URL = process.env.DB_URL + DB

// connection to database
module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true
    }
    try {
        mongoose.connect(DB_URL, connectionParams)
        console.log(`connected to ${DB} database`)
    } catch (error) {
        console.log(error)
    }
}