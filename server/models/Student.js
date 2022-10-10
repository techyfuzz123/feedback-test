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
        "I": { type : Boolean, default : false },
        "II": { type : Boolean, default : false },
        "III": { type : Boolean, default : false },
        "IV": { type : Boolean, default : false },
        "V": { type : Boolean, default : false },
        "VI": { type : Boolean, default : false },
        "VII": { type : Boolean, default : false },
        "VIII": { type : Boolean, default : false }
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