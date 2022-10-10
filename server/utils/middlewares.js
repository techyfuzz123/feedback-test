const { Responses } = require('../models/Response')
const jwt = require("jsonwebtoken");
require('dotenv').config()


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



// it is a middleware that takes schema and the req.body to validata the data
function validateData(ajvValidate) {
    return (req, res, next) => {
      const valid = ajvValidate(req.body);
      if (!valid) {
        // it is imperative that the reference to the errors is copied
        // the next time ajv runs the errors object could be overridden
        // because under the hood it is just a pointer
        // that's why the reference needs to be copied in the same execution
        // block. Note that Node is single-threaded and you do not have
        // concurrency
        // in this simple example it would work without copying
        // simply because we are directly terminating the request with
        // res.status(400).json(...)
        // but in general copying the errors reference is crucial
        const errors = ajvValidate.errors;
        return res.status(400).json(errors);
      }
      next();
    };
  }



//middleware function to check if the incoming request in authenticated:
const checkAuth = (req, res, next) => {

//send error message if no token is found:
  if (!token) {
    return res.status(401).json({ error: "Access denied, token missing!" });
  } else {
    try {
      //if the incoming request has a valid token, we extract the payload from the token and attach it to the request object.
      const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = payload.user;
      next();
    } catch (error) {
      // token can be expired or invalid. Send appropriate errors in each case:
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ error: "Session timed out,please login again" });
      } else if (error.name === "JsonWebTokenError") {
        return res
          .status(401)
          .json({ error: "Invalid token,please login again!" });
      } else {
        //catch other unprecedented errors
        console.error(error);
        return res.status(400).json({ error });
      }
    }
  }
};
  
  module.exports = { validateData, checkAuth };
