const ajvInstance = require('./ajv-instance');


// 1) Subject Knowledge
// 2) Clear Explanation
// 3) Usage of Teaching Tools (PPt,Vedios,Khoot,Google Classroom) and Activities (Quiz in Kahoot,Hot Potatos,Moodle,GD,Seminar,Debate,Case Study,..)
// 4) Extra Input/Current Trends
// 5) Teacher - Student Relationship

const asingleSubjectResponseSchema = {
    type: 'object',
    properties: {
        a: { type: 'number' },
        b: { type: 'number' },
        c: { type: 'number' },
        d: { type: 'number' },
        e: { type: 'number' },
    },
    requried: [ 'a', 'b', 'c', 'd', 'e' ]
}



const subjectSchema = {
    type: 'object',
    properties: {
        subjectCode: { type: 'string', minLength: 7, maxLength: 10 },
        subjectName: { type: 'string' },
        faculty: { type: 'string', minLength: 5, maxLength: 15 },
        response: { 
            type: 'object',
            properties: {
                subjectKnowledge: { type: 'number' },
                clearExplanation: { type: 'number' },
                usageOfTeachingTools: { type: 'number' },
                ExtraInput: { type: 'number' },
                TeacherStudentRelationship: { type: 'number' },
            },
            requried: [ 'subjectKnowledge', 'clearExplanation',
                        'usageOfTeachingTools',
                        'ExtraInput', 'TeacherStudentRelationship' ]
        }
    },
    required: ['subjectCode', 'subjectName', 'faculty', 'response']
}


// IT IS THE MAIN SCHEMA
const responseSchema = {
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


module.exports = ajvInstance.compile(responseSchema);

