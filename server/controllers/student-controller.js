require('dotenv').config()
const {Student} = require("../models/Student")
const jwt = require('jsonwebtoken')


/* 
    This Controller can add students to the students 
    collection in the database
*/
const addStudents = async (req, res) => {
    filter = {
        batch: req.body.batch,
        degree: req.body.degree,
        section: req.body.section
    }
    Student.insertMany(req.body, (error, docs) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
        return res.status(200).json({ message: `${docs.length } students added successfully`, docs });
    })
}

/*  
    This Controller will send the data of the student whose register
    number is provided from the client
*/
const getStudents = async (req,res) => {

    let students = await Student.find(req.body)

    return res.status(200).json({"strength":students.length,"students" : students})
}

/* 
    this Controller can add students to the students 
    collection in the database
*/
const updateStudents = async (req, res) => {
    let filter = {
        "batch" : req.body[0].batch,
        "degree" : req.body[0].degree,
        "section" : req.body[0].section,
    }
    
    let a = await Student.updateMany(filter, req.body)
    return res.status(500).json({"a" : a})
}

/* 
    This Controller will delete the particular student
*/
const deleteStudents = async (req, res) => {
    const { regNo } = req.body

    if(!regNo) {
        return res.status(400).json({"message" : "need regNo"})
    }

    // see if the register number already exists
    let existingStudent
    try {
        existingStudent = await Student.findOneAndDelete({"regNo" : regNo})
    } catch (error) {
        console.log(error)
        return res.status(500).json({"message" : "Internal Server Error"})
    }
    if(!existingStudent) {
        return res.status(404).json({"message" : "Student does'nt exists"})
    }
    return res.status(200).json({"message" : "Student Deleted"})
}

module.exports = {  addStudents, getStudents, updateStudents, deleteStudents }