const mongoose = require('mongoose');

const studentSchema = mongoose.Schema ({
    "name" : { type : String, required : true, trim : true },
    "regNo" : { type : Number, required : true, trim : true, unique : true },
    "dob" : { type : Date, required : true, trim : true },
    "batch" : { type : Number, required : true, trim : true },
    "degree" : { type : String, required : true, trim : true },
    "section" : { type : String, required : true, trim : true },
    "password" : { type : String },
    "isFeedbackSubmitted" : {
        "I": { 
            "feedback1" :{ type : Boolean, default : false },
            "feedback2" :{ type : Boolean, default : false }
         },
        "II": { 
            "feedback1" :{ type : Boolean, default : false },
            "feedback2" :{ type : Boolean, default : false }
         },
        "III": { 
            "feedback1" :{ type : Boolean, default : false },
            "feedback2" :{ type : Boolean, default : false }
         },
        "IV": { 
            "feedback1" :{ type : Boolean, default : false },
            "feedback2" :{ type : Boolean, default : false }
         },
        "V": { 
            "feedback1" :{ type : Boolean, default : false },
            "feedback2" :{ type : Boolean, default : false }
         },
        "VI": { 
            "feedback1" :{ type : Boolean, default : false },
            "feedback2" :{ type : Boolean, default : false }
         },
        "VII": { 
            "feedback1" :{ type : Boolean, default : false },
            "feedback2" :{ type : Boolean, default : false }
         },
        "VIII": { 
            "feedback1" :{ type : Boolean, default : false },
            "feedback2" :{ type : Boolean, default : false }
         },
    },
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