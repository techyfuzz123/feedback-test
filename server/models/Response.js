const mongoose = require('mongoose');

const responseSchema = mongoose.Schema({
    "batch" : {
        type : Number, 
        required : true
    },
    "degree" : {
        type : String, 
        required : true
    },
    "section" : {
        type : String, 
        required : true
    },
    "semester" : {
        type : String, 
        required : true
    },  
    "subjects" : [
        {
            "subjectCode" : {
                type : String,
                required : true
            },
            "subjectName" : {
                type : String,
                required : true
            },
            "faculty" : {
                type : String,
                required : true
            },
            "response" : {
                "a" : {
                    type : Number,
                    required : true
                },
                "b" : {
                    type : Number,
                    required : true
                },
                "c" : {
                    type : Number,
                    required : true
                },
                "d" : {
                    type : Number,
                    required : true
                },
                "e" : {
                    type : Number,
                    required : true
                },
            }
        }
    ]
})

const Response = mongoose.model('Response', responseSchema)

module.exports = { Response }