const { Feedback } = require('../models/Feedback')


const addFeedback = async (req, res) => {
    const filter = {
        "batch" : req.body[0].batch,
        "degree" : req.body[0].degree,
        "section" : req.body[0].section,
        "semester" : req.body[0].semester,
        "feedbackNo" : req.body[0].feedbackNo
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

    res.status(200).json({ "message" : "feedback added", feedback })
    // res.status(200).json({ "message" : "feedback added", feedback }

    try {
        feedback = await Feedback(
            {
                "batch" : 2026,
                "degree" : "LF,-CSE",
                "section" : "S",
                "semester" : "E",
                "subjects" : [
                    {
                        "subjectCode" : "20CS4343",
                        "subjectName" : "Cs for nobody",
                        "faculty" : "Ajith"
                    },
                    {
                        "subjectCode" : "20CS4344",
                        "subjectName" : "Cs for everybody",
                        "faculty" : "vijay"
                    }
                ]
            }
        ).save()
    } catch (error) {
        console.log(error)
    }
}

module.exports = { addFeedback }
