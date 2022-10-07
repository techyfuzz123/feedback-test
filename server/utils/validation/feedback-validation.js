const ajvInstance = require('./ajv-instance');


const subjectSchema = {
    type: 'object',
    properties: {
        subjectCode: { type: 'string', minLength: 7, maxLength: 10 },
        subjectName: { type: 'string' },
        faculty: { type: 'string', minLength: 5, maxLength: 15 },
    },
    required: ['subjectCode', 'subjectName', 'faculty']
}


// IT IS THE MAIN SCHEMA
const feedbackSchema = {
    type: 'object',
    properties: {
      batch: { type: 'number'},
      degree: { type: 'string', minLength: 5, maxLength: 10 },
      section: { type: 'string', minLength: 1, maxLength: 1 },
      semster: { type: 'string', minLength: 1, maxLength: 2 },
      subjects : { type: 'array', items: subjectSchema }
    },
    required: ['batch', 'degree', 'section', 'semester'],
  };


// array of feedbacks
const feedbacksSchema = {
    type: "array",
    items: feedbackSchema
}

module.exports = ajvInstance.compile(feedbacksSchema);

