const { Feedback } = require('../models/Feedback')

// {
//     "batch" : {
//         type : Number, 
//         required : true
//     },
//     "degree" : {
//         type : String, 
//         required : true
//     },
//     "section" : {
//         type : String, 
//         required : true
//     },
//     "semester" : {
//         type : String, 
//         required : true
//     },  
//     "subjects" : [
//         {
//             "subjectCode" : {
//                 type : String,
//                 required : true
//             },
//             "subjectName" : {
//                 type : String,
//                 required : true
//             },
//             "faculty" : {
//                 type : String,
//                 required : true
//             },
//         }
//     ]
// }

const addFeedback = async (req, res) => {
    const filter = {
        "batch" : req.body.batch,
        "degree" : req.body.degree,
        "section" : req.body.section,
        "semester" : req.body.semester
    }

    let feedback;

    try {
        feedback = await Feedback.findOne(filter)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }

    if (feedback) { return res.status(409).json('feedback already exists') }

    try {
        feedback = await Feedback(req.body).save()
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }

    return res.status(200).json({ "message" : "feedback added", feedback })
}


module.exports = { addFeedback }
