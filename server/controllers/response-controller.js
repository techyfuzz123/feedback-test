const { Response } = require('../models/Response')


const submitResponse = async (req, res) => {

    let filter = {
        batch : req.body.batch,
        degree : req.body.degree,
        section : req.body.section,
        semester : req.body.semester
    }

    let values = req.body

    let existingResponse 
    let subjects

    try {
        existingResponse = await Response.findOne(filter)
        // subjects = await Response.findOne(filter, {subjects: {subjectCode:1}})
    } catch (error) {
        return new Error(error)
    }



     const response = await Response(req.body).save() 

    // let responses = [];
    // const map = new Map();
    // for (const subject of existingResponse.subjects) {
    //     if(!map.has(subject.subjectCode)){
    //         map.set(subject.subjectCode, true);    // set any value to Map
    //         responses.push({
    //             subjectCode: subject.subjectCode,
    //             response : subject.response
    //         });
    //     }
    // }




    // console.log(getBooksWithRatings)

    // const a = await existingResponse.subjects.map(subject => {
    //     console.log(subject.subjectCode)
    //       Response.updateMany(
    //         filter,
    //         {
    //             $set: {
    //                 "subjects.$[element].response": {
    //                     "a" : ($old.a + values.subjects[0].response.a)/2,
    //                     "b" : ($old.b + values.subjects[0].response.b)/2,
    //                     "c" : ($old.c + values.subjects[0].response.c)/2,
    //                     "d" : ($old.d + values.subjects[0].response.d)/2,
    //                     "e" : ($old.e + values.subjects[0].response.e)/2
    //                 }
    //              }, 
                 
    //         }, { arrayFilters: [{"element.subjectCode" : subject.subjectCode }]},
    //     )
    // })

    try {
        existingResponse = await Response.findOne(filter)
    } catch (error) {
        return new Error(error)
    }

    // let subs = req.body.subjects

    // const subjects = [];
    // const map = new Map();
    // for (const subject of subs) {
    //     if(!map.has(subject.subjectCode)){
    //         map.set(subject.subjectCode, true);    // set any value to Map
    //         subjects.push({
    //             subjectCode: subject.subjectCode,
    //             subjectName: subject.subjectName,
    //             faculty: subject.faculty,
    //         });
    //     }
    // }

    // const average = arr.reduce((a, b) => a + b, 0) / arr.length;




    return res.status(200).json({message:"working", response })
}

module.exports = { submitResponse }







// const a = await Response.updateMany(
//     {
//         batch : req.body.batch,
//         degree : req.body.degree,
//         section : req.body.section,
//         semester : req.body.semester,
//     },
//     {
//         $set: {
//             "subjects.$[element].response": {
//                 "a" : (existingResponse.subjects[0].response.a + values.subjects[0].response.a)/2,
//                 "b" : (existingResponse.subjects[0].response.b + values.subjects[0].response.b)/2,
//                 "c" : (existingResponse.subjects[0].response.c + values.subjects[0].response.c)/2,
//                 "d" : (existingResponse.subjects[0].response.d + values.subjects[0].response.d)/2,
//                 "e" : (existingResponse.subjects[0].response.e + values.subjects[0].response.e)/2
//             }
//          }, 
         
//     }, { arrayFilters: [{"element.subjectCode" : "20CS4343"}]},
// )


// const getBooks = () => {
//     return [
//       { id: 1, name: "Python Data Science" },
//       { id: 2, name: "Python Machine Learning" },
//       { id: 3, name: "Development Flask" },
//       { id: 4, name: "Mongo Database" },
//       { id: 5, name: "ULM for Dummies" },
//       { id: 6, name: "Java for Dummies" },
//       { id: 7, name: "Learn Rust in 2 hours" },
//     ];
//   };
  
//   const getRating = () => {
//     return [
//       { book_id: 1, client_id: 1, rating: 4.5 },
//       { book_id: 1, client_id: 4, rating: 5 },
//       { book_id: 1, client_id: 25, rating: 5 },
//       { book_id: 1, client_id: 2112, rating: 4 },
  
//       { book_id: 2, client_id: 34, rating: 3 },
//       { book_id: 2, client_id: 123, rating: 4 },
//       { book_id: 2, client_id: 23, rating: 4 },
//       { book_id: 2, client_id: 255, rating: 4 },
  
//       { book_id: 3, client_id: 98, rating: 2 },
//       { book_id: 3, client_id: 45, rating: 1 },
//       { book_id: 3, client_id: 223, rating: 3 },
//       { book_id: 3, client_id: 213, rating: 1.5 },
  
//       { book_id: 4, client_id: 652, rating: 4.5 },
//       { book_id: 4, client_id: 42, rating: 4.5 },
//       { book_id: 4, client_id: 562, rating: 4.5 },
  
//       { book_id: 5, client_id: 2, rating: 5 },
//       { book_id: 5, client_id: 2, rating: 5 },
//       { book_id: 5, client_id: 2, rating: 5 },
  
//       { book_id: 6, client_id: 2, rating: 4.5 },
//       { book_id: 6, client_id: 2, rating: 4.5 },
//       { book_id: 6, client_id: 2, rating: 4.5 },
  
//       { book_id: 7, client_id: 2, rating: 4.5 },
//       { book_id: 7, client_id: 2, rating: 4.5 },
//       { book_id: 7, client_id: 2, rating: 4.5 },
//       { book_id: 7, client_id: 2, rating: 4.5 },
//       { book_id: 7, client_id: 2, rating: 4.5 },
//     ];
//   };
  
//   const getBooksWithRatings = () => {
//     return getBooks().map((book) => {
//       const ratings = getRating().filter((r) => r.book_id === book.id);
//       book.average = ratings.reduce((acc, el) => acc + el.rating, 0) / ratings.length;
//       return book;
//     });
//   };