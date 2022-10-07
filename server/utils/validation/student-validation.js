const ajvInstance = require('./ajv-instance');


const feedbackSchema = {
    type: 'object',
    properties: {
        semester: { type: 'string', minLength: 1, maxLength: 1 },
        isFeedbackSubmitted: { type: 'boolean' }
    },
    required: ['semester', 'isFeedbackSubmitted']
}

const subjectSchema = {
    type: 'object',
    properties: {
        subjectCode: { type: 'string', minLength: 7, maxLength: 10 },
        subjectName: { type: 'string', maxLength: 15 },
        faculty: { type: 'string', minLength: 5, maxLength: 15 },
    },
    required: ['subjectCode', 'subjectName', 'faculty']
}



// IT IS THE MAIN SCHEMA
const studentSchema = {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 4 },
      regNo: { type: 'number'},
      batch: { type: 'number'},
      degree: { type: 'string', minLength: 5, maxLength: 10 },
      section: { type: 'string', minLength: 1, maxLength: 1 },
      password: { type: 'string', minLength: 5, maxLength: 10 },
      feedback : { type: 'array', items: feedbackSchema },
      subjects : { 
          type: 'object',
          properties: {
              include: { type: 'array', items: subjectSchema },
              exclude: { type: 'array', items: subjectSchema }
          },
          required: ['include']
        }
    },
    required: ['name', 'regNo', 'batch', 'degree', 'section'],
  };


// array of students
const studentsSchema = {
    type: "array",
    items: studentSchema
}

module.exports = ajvInstance.compile(studentsSchema);


// countryCode: {
//     type: 'string',
//     enum: ['US', 'CA'],
//   },