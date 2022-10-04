const mongoose  = require('mongoose');

/* 
    {
        "name" : "Amar",
        "email" : "Amar@clg.in",
        "department" : "CSE",
        "handlingSubjects" : [
            {
                "batch" : 2020,
                "degree" : "BE-CSE",
                "section" : "C",
                "courseCode" : "19VS4423"
            }
        ]
    }
*/


const facultySchema = mongoose.Schema({
    "name" : {
        type : String,
        required : true,
        trim : true
    },
    "email" : {
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
    "handlingSubjects" : [
        {
            "batch" : {
                type : Number,
                required : true,
                trim : true
            },
            "degree" : {
                type : String,
                required : true,
                trim : true
            },
            "section" : {
                type : String,
                required : true,
                trim : true
            },
            "courseCode" : {
                type : String,
                required : true,
                trim : true
            },
        }
    ]
    
})

const Faculty = mongoose.model("faculty", facultySchema)

module.exports = { Faculty }