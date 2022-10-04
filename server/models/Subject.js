const mongoose = require('mongoose');

/* 
    {
        "courseType" : "regular",
        "courseCode" : "19VS4423",
        "department" : "CSE",
        "semester" : "V",
        "handlingFaculties" : [
            "someone@clg.in",
            "anotherone@clg.in"
        ]
    }
*/

const subjectSchema = mongoose.Schema({
    "courseType" : {
        type : String,
        required : true,
        trim : true
    },
    "courseCode" : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    "department" : {
        type : String,
        required : true,
        trim : true
    },
    "semester" : {
        type : String,
        required : true,
        trim : true
    },
    "handlingFaculties" : {
        type : Array,
        required : true,
        trim : true
    }
})

const Subject = mongoose.model("subject", subjectSchema)

module.exports = { Subject }