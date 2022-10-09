const { Feedback } = require('../models/Feedback')
const { Student } = require('../models/Student')


const addFeedback = async (req, res) => {
    const filter = {
        "batch" : req.body[0].batch,
        "degree" : req.body[0].degree,
        "section" : req.body[0].section,
        "semester" : req.body[0].semester
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
        feedback = await Feedback(req.body[0]).save()
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }


    let students = await Student.find({"batch":req.body.batch})
    // console.log(students)
    return res.status(200).json({ "message" : "feedback added", feedback , students})
    // res.status(200).json({ "message" : "feedback added", feedback })



}




module.exports = { addFeedback }
