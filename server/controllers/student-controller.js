require('dotenv').config()
const {Student} = require("../models/Student")
const jwt = require('jsonwebtoken')


/* 
    This Controller can add students to the students 
    collection in the database
*/
const addStudent = async (req, res) => {
    const { regNo } = req.body

    if(!regNo) {
        return res.status(400).json({"message" : "need regNo"})
    }

    // see if the register number already exists
    let existingStudent
    try {
        existingStudent = await Student.findOne({"regNo" : regNo})
    } catch (error) {
        console.log(error)
        return res.status(500).json({"message" : "Internal Server Error"})
    }
    if(existingStudent) {
        return res.status(409).json({"message" : "Student Already Exists"})
    }

    // create new student
    let newStudent
    try {
        newStudent = await Student.create(req.body, (error, doc)=> {
            if(error) {
                return res.status(400).json({"error" : error})
            }
            return res.status(200).json({"message" : "Student added Successfully"})
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({"message" : "Internal Server Error"})
    }
}

/* 
    This Controller will send the data of the student whose register
    number is provided from the client
*/
const getStudent = async (req, res) => {
    const { regNo } = req.body

    if(!regNo) {
        return res.status(400).json({"message" : "need regNo"})
    }

    // see if the register number already exists
    let existingStudent
    try {
        existingStudent = await Student.findOne({"regNo" : regNo}, "-password").populate('staff')
    } catch (error) {
        console.log(error)
        return res.status(500).json({"message" : "Internal Server Error"})
    }
    if(!existingStudent) {
        return res.status(409).json({"message" : "Student does'nt Exists"})
    }
    return res.status(200).json({"student" : existingStudent})
}

const getStudents = async (req,res) => {
    let students;
    try {
        students = await Student.find({}, "-password").populate('staff')
    } catch (error) {
        console.log(error)
        return res.status(500).json({"message" : "Internal Server Error"})
    }
    return res.status(200).json({students})
}

/* 
    this Controller can add students to the students 
    collection in the database
*/
const updateStudent = async (req, res) => {
    const { regNo } = req.body

    if(!regNo) {
        return res.status(400).json({"message" : "need regNo"})
    }

    let studentUpdate
    try {
        studentUpdate = await Student.findOneAndUpdate({"regNo" : regNo}, req.body)
        studentUpdate = await Student.findOne({"regNo": regNo})
    } catch (error) {
        console.log(error)
        return res.status(500).json({"message" : "Internal Server Error"})
    }
    if(studentUpdate) {
        return res.status(200).json({"message" : "Student updated", "student" : studentUpdate})
    }
}

/* 
    This Controller will delete the particular student
*/
const deleteStudent = async (req, res) => {
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

module.exports = { addStudent, getStudent, getStudents, updateStudent, deleteStudent }