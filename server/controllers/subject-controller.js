const { Subject } = require('../models/Subject')


const addSubjects = async (req, res) => {
    // const { courseCode } = req.body
    // let subject

    // if (!courseCode) {
    //     return res.status(409).json({"message" : "courseCode needed"})
    // }

    // try {
    //     subject = await Subject.findOne({"courseCode" : courseCode})
    // } catch (error) {
    //     console.log(error)
    //     return res.status(500).json({"message" : "Internal Server Error"})
    // }

    // if(subject) {
    //     return res.status(409).json({"message" : "subject already exists"})
    // }

    // try {
    //     subject = await Subject.insertOne()
    // } catch (error) {
        
    // }

    Subject.collection.insertMany(req.body, (err, docs) => {
        if (err) {
            try {
                return res.status(409).json({ "error": err.writeErrors[0].errmsg });
            } catch (error) {
                console.log(err);
                return res.status(500).json({ "message": "internal server error" });
            } 
        }
        return res.status(200).json({ message: `${docs.insertedCount} subjects added successfully` });
    })



}

const getSubjects = async (req, res) => {
    let subjects;
    try {
        subjects = await Subject.find(req.body)
    } catch (error) {
        console.log(error)
        return res.status(500).json({"message" : "Internal Server Error"})
    }

    if(!subjects[0]) {
        return res.status(404).json({"message" : "there is no subject"})
    }0

    return res.status(200).json({subjects: subjects})
}

const updateSubject = async (req, res) => {
    /* rightnow can update only one subject at a time */
    const { email } = req.body
    let subjects;
    try {
        subjects = await Subject.findOneAndUpdate({"email" : email},req.body)
    } catch (error) {
        console.log(error)
        return res.status(500).json({"message" : "Internal Server Error"})
    }

    if(!subjects) {
        return res.status(404).json({"message" : "there is no subject"})
    }

    return res.status(200).json({"message": "subject updated"})
}

const deleteSubject = async (req, res) => {
        /* rightnow can update only one subject at a time */
        const { email } = req.body
        let subjects;
        try {
            subjects = await Subject.findOneAndDelete({"email" : email},req.body)
        } catch (error) {
            console.log(error)
            return res.status(500).json({"message" : "Internal Server Error"})
        }
    
        if(!subjects) {
            return res.status(404).json({"message" : "subject does'nt exists"})
        }
    
        return res.status(200).json({"message": "subject deleted"})
}

module.exports = { addSubjects, getSubjects, updateSubject, deleteSubject }