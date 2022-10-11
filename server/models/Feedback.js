const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
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
    "feedbackNo" : {
        type : Number, 
        required : true
    }, 
    "isLive" : { type : Boolean, default : false },
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
        }
    ]
})

// feedbackSchema.methods.addFeedbackToStudents = () => {
// }

// feedbackSchema.queue('addFeedbackToStudents')

const Feedback = mongoose.model('Feedback', feedbackSchema)

module.exports = { Feedback }