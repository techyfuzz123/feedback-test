const { Student } = require("../models/Student");
const { Staff } = require("../models/Staff");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET_KEY = process.env.JWT;
const REFRESH_JWT_SECRET_KEY = process.env.REFRESH_JWT;
const IS_DEVELOPMENT = process.env.IS_DEVELOPMENT === "true";

let secureAndSameSite = {};

if (!IS_DEVELOPMENT) {
  secureAndSameSite = {
    secure: true,
    sameSite: "none",
  };
}

// * this function will run when a student tries to login
const studentLogin = async (req, res) => {
  const { regNo, dob, password } = req.body;

  // * checking if all three values are available
  if (!regNo || !dob || !password) {
    return res.status(400).json({
      eMessage: "need register number, date of birth and password",
      path: "student",
    });
  }

  // * find the student if available
  let student;
  try {
    student = await Student.findOne({ regNo: regNo });
  } catch (err) {
    return new Error(err);
  }
  if (!student) {
    return res
      .status(404)
      .json({ eMessage: "user not found", path: "student" });
  }

  // * Check if the dob and password are correct
  const isDobCorrect = dob === student.dob;
  const isPasswordCorrect = bcrypt.compareSync(password, student.password);

  if (!isPasswordCorrect || !isDobCorrect) {
    return res
      .status(401)
      .json({ eMessage: "Invalid Credential", path: "student" });
  }

  // * Generating Token
  const accessToken = jwt.sign({ id: student.regNo }, JWT_SECRET_KEY, {
    expiresIn: "15m",
  });

    const refreshToken = jwt.sign(
        { "id": student.regNo },
        REFRESH_JWT_SECRET_KEY,
        { expiresIn: '7d' }
    )

    // Create secure cookie with refresh token 
    res.cookie('token', refreshToken, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })

    // Send accessToken containing username and roles 
    return res.json({ accessToken })

  // // * Adding token to cookie
  // res.cookie("token", token, {
  //   path: "/",
  //   expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes , (60 * 1000) = 1 min
  //   httpOnly: true,
  //   ...secureAndSameSite,
  // });

  // // * data that has to be sent minimum
  // let studentData = {
  //   name: student.name,
  //   regNo: student.regNo,
  //   batch: student.batch,
  //   degree: student.degree,
  //   section: student.section,
  // };

  // return res.status(200).json({ ...studentData });
}

// const a = asyncHandler(async (req, res) => {
//     const { username, password } = req.body

//     if (!username || !password) {
//         return res.status(400).json({ message: 'All fields are required' })
//     }

//     const foundUser = await User.findOne({ username }).exec()

//     if (!foundUser || !foundUser.active) {
//         return res.status(401).json({ message: 'Unauthorized' })
//     }

//     const match = await bcrypt.compare(password, foundUser.password)

//     if (!match) return res.status(401).json({ message: 'Unauthorized' })

//     const accessToken = jwt.sign(
//         {
//             "UserInfo": {
//                 "username": foundUser.username,
//                 "roles": foundUser.roles
//             }
//         },
//         process.env.ACCESS_TOKEN_SECRET,
//         { expiresIn: '15m' }
//     )

//     const refreshToken = jwt.sign(
//         { "username": foundUser.username },
//         process.env.REFRESH_TOKEN_SECRET,
//         { expiresIn: '7d' }
//     )

//     // Create secure cookie with refresh token 
//     res.cookie('jwt', refreshToken, {
//         httpOnly: true, //accessible only by web server 
//         secure: true, //https
//         sameSite: 'None', //cross-site cookie 
//         maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
//     })

//     // Send accessToken containing username and roles 
//     res.json({ accessToken })
// })

// * this function will run when a student tries to logout

const studentLogout = async (req, res) => {
  // * Checking if token exists and Getting the token from cookie
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      ...secureAndSameSite,
    })
    .json({ message: "logged out" });
};

const staffLogin = async (req, res) => {
  const { userName, password } = req.body;

  // * checking if all three values are available
  if (!userName || !password) {
    return res
      .status(401)
      .json({ eMessage: "need userName and password", path: "staff" });
  }

  // * find the student if available
  let staff;
  try {
    staff = await Staff.findOne({ userName: userName });
  } catch (err) {
    return new Error(err);
  }
  if (!staff) {
    return res.status(404).json({ eMessage: "user not found", path: "staff" });
  }

  // * Check if the password are correct
  const isPasswordCorrect = bcrypt.compareSync(password, staff.password);

  if (!isPasswordCorrect) {
    return res
      .status(400)
      .json({ eMessage: "Invalid Credential", path: "staff" });
  }

  // * Generating Token
  const accessToken = jwt.sign({ id: String(staff.userName) }, JWT_SECRET_KEY, {
    expiresIn: "15m",
  });

    const refreshToken = jwt.sign(
        { id: String(staff.userName) },
        REFRESH_JWT_SECRET_KEY,
        { expiresIn: '7d' }
    )

    // Create secure cookie with refresh token 
    res.cookie('token', refreshToken, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })

    // Send accessToken containing username and roles 
    return res.json({ accessToken })


  // // * Generating Token
  // const token = jwt.sign({ id: String(staff.userName) }, JWT_SECRET_KEY, {
  //   expiresIn: "900s",
  // });

  // // * removing old token if it exists
  // if (req.cookies[`token`]) {
  //   req.cookies[`token`] = "";
  // }

  // // * Adding token to cookie
  // res.cookie("token", token, {
  //   path: "/",
  //   expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes , (60 * 1000) = 1 min
  //   httpOnly: true,
  //   ...secureAndSameSite,
  // });

  // // * Defining the data which has to be return to the user
  // let userData = {
  //   userName: staff.userName,
  //   role: staff.role,
  //   batch: staff.batch,
  //   degree: staff.degree,
  //   section: staff.section,
  // };

  // return res.status(200).json({ ...userData });
};

const staffLogout = async (req, res) => {
  // * Checking if token exists and Getting the token from cookie

  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      ...secureAndSameSite,
    })
    .json({ message: "logged out" });
};

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const studentRefresh = (req, res) => {
    const cookies = req.cookies
    console.log(cookies)

    if (!cookies?.token) return res.status(401).json({ message: 'Unauthorized' })

    const refreshToken = cookies.token

    jwt.verify(
        refreshToken,
        REFRESH_JWT_SECRET_KEY,
        async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const student = await Student.findOne({ regNo: decoded.id })

            if (!student) return res.status(401).json({ message: 'Unauthorized' })

            const accessToken = jwt.sign(
                {
                    id : 
                         student.regNo
                    
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )

            res.json({ accessToken })
        }
    )
}

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const staffRefresh = (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        REFRESH_JWT_SECRET_KEY,
        async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const staff = await Staff.findOne({ userName: decoded.id })

            if (!staff) return res.status(401).json({ message: 'Unauthorized' })

            const accessToken = jwt.sign(
                {
                    id: String(staff.userName)
                    
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )

            res.json({ accessToken })
        }
    )
}

module.exports = { studentLogin, studentLogout, staffLogin,studentRefresh,staffRefresh, staffLogout };
