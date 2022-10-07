const mongoose = require('mongoose');

/* 
    {
        "name" : "Amar",
        "regNo" : 20010458,
        "batch" : 2020,
        "section" : "C",
        "degree" : "BE-CSE",
        "password" : "hicet",
        "feedback" : [
            {
                "semester" : "V",
                "isFeedBackSubmitted" : false
            }
        ],
        "subjects" : {
            "include" : [
                {
                    "subjectCode" : "19CS3322",
                    "subjectName" : "CS for Nobody",
                    "faculty" : "JD"
                }
            ],
            "exclude" : [
                {
                    "subjectCode" : "19CS3321",
                    "subjectName" : "CS for Everybody",
                    "faculty" : "JD"
                }
            ]
        }
    }
*/

const studentSchema = mongoose.Schema ({
    "name" : { type : String, required : true, trim : true },
    "regNo" : { type : Number, required : true, trim : true, unique : true },
    "batch" : { type : Number, required : true, trim : true },
    "degree" : { type : String, required : true, trim : true },
    "section" : { type : String, required : true, trim : true },
    "password" : { type : String, default : "hicet" },
    "feedback" : [
        {
            "semester" : { type : String, required : true },
            "isFeedbackSubmitted" : { type : Boolean, default : false }
        }
    ],
    "subjects" : {
        "include" : [
            {
                "subjectCode" : { type : String, required : true },
                "subjectName" : { type : String, required : true },
                "faculty" : { type : String, required : true }
            }
        ],
        "exclude" : [
            {
                "subjectCode" : { type : String, required : true },
                "subjectName" : { type : String, required : true },
                "faculty" : { type : String, required : true }
            }
        ]
    }
}, {versionKey : false})

const Student = mongoose.model('Student', studentSchema)


module.exports = {Student}