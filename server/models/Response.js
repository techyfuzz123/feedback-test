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
                "1" : {
                    type : Number,
                    required : true
                },
                "2" : {
                    type : Number,
                    required : true
                },
                "3" : {
                    type : Number,
                    required : true
                },
                "4" : {
                    type : Number,
                    required : true
                },
                "5" : {
                    type : Number,
                    required : true
                },
            }
        }
    ]
})

const Response = mongoose.model('Response', responseSchema)

module.exports = { Response }