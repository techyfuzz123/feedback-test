const mongoose = require('mongoose');

/* 
    {
        "name" : "Amar",
        "regNo" : 20010458,
        "batch" : 2020,
        "section" : "C",
        "degree" : "BE-CSE",
        "password" : "hicet",
        "isFeedBackSubmitied" : false,
        "subjects" : {
            "regular" : [
                "19VS4421",
                "19VS4422",
                "19VS4423",
                "19VS4424",
                "19VS4425"
            ],
            "arrear" : [
                "29SD4583"
            ],
            "elective" : [
                "34DF4554"
            ]
        }
    }
*/

const studentSchema = mongoose.Schema ({
    "name" : {
        type : String,
        required : true,
        trim : true
    },
    "regNo" : {
        type : Number,
        required : true,
        trim : true,
        unique : true
    },
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
    "password" : {
        type : String,
        default : "hicet"
    },
    "isFeedBackSubmitted" : {
        type : Boolean,
        default : false
    },
    "subjects" : {
        "regular" : {
            type : Array,
            required: true,
            trim : true
        },
        "arrear" : {
            type : Array,
            trim : true
        },
        "elective" : {
            type : Array,
            trim : true
        }
    },
    "staff" : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Faculty"
    }
}, {versionKey : false})

const Student = mongoose.model('Student', studentSchema)

module.exports = {Student}