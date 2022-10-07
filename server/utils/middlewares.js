const { Responses } = require('../models/Response')
const { Report } = require('../models/Report')


const updateReport = async (req, res, next) => {
    
    const filter = {
        "batch" : req.body.batch,
        "degree" : req.body.degree,
        "section" : req.body.section,
        "semester" : req.body.semester
    }
    
    let a = []

    let responses = await Responses.find(filter)

    responses.map(index, response => {
        let subjectResponses = response.subjects.response

        subjectResponses.map(index, singleSubjectResponse => {
        })
    })




}
