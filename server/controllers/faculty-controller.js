const { Faculty } = require('../models/Faculty')


const addFaculties = async (req, res) => {
    Faculty.collection.insertMany(req.body, (err, docs) => {
        if (err) {
            if (err.writeErrors[0].errmsg) {
                return res.status(409).json({ "error": err.writeErrors[0].errmsg });
            }
            console.log(err);
            return res.status(500).json({ "message": "internal server error" });
        }
        return res.status(200).json({ message: `${docs.insertedCount} faculties added successfully` });
    })
}

const getFaculties = async (req, res) => {
    let faculties;
    try {
        faculties = await Faculty.find(req.body)
    } catch (error) {
        console.log(error)
        return res.status(500).json({"message" : "Internal Server Error"})
    }

    if(!faculties[0]) {
        return res.status(404).json({"message" : "there is no faculty"})
    }

    return res.status(200).json({faculties: faculties})
}

const updateFaculties = async (req, res) => {
    /* rightnow can update only one faculty at a time */
    const { email } = req.body
    let faculties;
    try {
        faculties = await Faculty.findOneAndUpdate({"email" : email},req.body)
    } catch (error) {
        console.log(error)
        return res.status(500).json({"message" : "Internal Server Error"})
    }

    if(!faculties) {
        return res.status(404).json({"message" : "there is no faculty"})
    }

    return res.status(200).json({"message": "faculty updated"})
}

const deleteFaculties = async (req, res) => {
    /* rightnow can update only one faculty at a time */
    const { email } = req.body
    let faculties;
    try {
        faculties = await Faculty.findOneAndDelete({"email" : email},req.body)
    } catch (error) {
        console.log(error)
        return res.status(500).json({"message" : "Internal Server Error"})
    }

    if(!faculties) {
        return res.status(404).json({"message" : "faculty does'nt exists"})
    }

    return res.status(200).json({"message": "faculty deleted"})
}

module.exports = { addFaculties, getFaculties, updateFaculties, deleteFaculties }